from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.conf.urls import *
from core.models import Challenge
from core.models import Answer
from core.models import User
from core.models import Photo
from core.models import Friend
from core.models import Vote
#from tastypie.authorization import DjangoAuthorization
#from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie import fields
from tastypie.utils import trailing_slash

from tastypie.resources import ALL, ALL_WITH_RELATIONS

from tastypie.serializers import Serializer
import time
import base64
import os


#url /core/user : displays all users
#url /core/user/<username> : displays all informations about this user
#class UserResource(ModelResource):
#	class Meta:
#	
#		queryset = User.objects.all()#filter(username=request.user)
#		resource_name = 'user'
#		allowed_methods = ['get']
#		serializer = Serializer(formats=['xml', 'json'])
		#authorization = DjangoAuthorization()

	#Choices are: answer, challenge, date_joined, email, first_name, groups, id, is_active, is_staff, is_superuser, last_login, last_name, password, user_permissions, username
#	def prepend_urls(self):
#		return [
#			url(r"^(?P<resource_name>%s)/(?P<id>[\w\d_.-]+)/$" % self._meta.resource_name, self.wrap_view('dispatch_detail'), name="api_dispatch_detail"),
#		]
#
#url /core/challenge/ : displays all challenges
#url /core/challenge/<title> : displays all informations about this challenge

class UserResource(ModelResource):

	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])

		authorization= Authorization()
		#authentication = BasicAuthentication()
		always_return_data = True

		filtering = {
			'email': ALL_WITH_RELATIONS
		}

	def prepend_urls(self):
		return [
			url(r'^(?P<resource_name>%s)/search%s$' %(self._meta.resource_name, trailing_slash()),self.wrap_view('search'), name='api_search'),
			url(r'^(?P<resource_name>%s)/addFriend%s$' %(self._meta.resource_name, trailing_slash()),self.wrap_view('addFriend'), name='api_addFriend'),
			]

	def search(self, request, **kwargs):
		self.method_check(request, allowed=['post'])
		data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))
		nickname = data.get('nickname', '')
		user = [st.__dict__ for st in User.objects.filter(nickname=nickname)]
		return self.create_response(request, {
					'objects': [st.__dict__ for st in User.objects.filter(nickname=nickname)]
					})

	def addFriend(self, request, **kwargs):
		self.method_check(request, allowed=['post'])
		data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))
		userID = data.get('userID')
		friendID = data.get('friendID')
		my_user = User.objects.get(id=userID)
		my_user.friends.add(User.objects.get(id=friendID))
		my_user.save()
		return self.create_response(request, {
					'success': True
					})

	def dehydrate(self, bundle):
	 	userID = bundle.obj
		bundle.data['nbCompleted'] = Answer.objects.filter(userID=userID, status="completed").count()
		bundle.data['nbFailed'] = Answer.objects.filter(userID=userID, status="failed").count()
		bundle.data['friends'] = [friend.__dict__ for friend in bundle.obj.friends.all()]
		return bundle


class ChallengeResource(ModelResource):
	author = fields.ToOneField(UserResource, attribute='author' , related_name='author', full=True)
	#users = fields.ForeignKey(UserResource, attribute='users', full=True, null=True)
	class Meta:
		queryset = Challenge.objects.all()
		resource_name = 'challenge'
		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		#authentication = BasicAuthentication()
		always_return_data = True
		#fields=['author','description','title']

	def prepend_urls(self):
		return [
	  url(r"^(?P<resource_name>%s)/getChallenges%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('getChallenges'), name="api_getChallenges")
	 ]

	def getChallenges(self, request, **kwargs):
		self.method_check(request, allowed=['get'])
		userID = request.GET['userID']
		sqsAnswer = Answer.objects.filter(userID=userID)
		if sqsAnswer:
			sqsAnswer = [ans for ans in sqsAnswer]
			sqsChallenge = Challenge.objects.exclude(id__in=[ans.challengeID.id for ans in sqsAnswer])
			if sqsChallenge:
				return self.create_response(request, {
					'success': True,
					'objects': [challenge.__dict__ for challenge in sqsChallenge]
					})

	# def dehydrate(self, bundle):
	# 	sqs = Answer.objects.filter(challengeID=bundle.obj.id)
	# 	if sqs:
	# 		return None
	# 	else:
	# 		return bundle


class AnswerResource(ModelResource):
	userID = fields.OneToOneField(UserResource, attribute='userID' , related_name='userID', full=True, null=True)
	challengeID = fields.OneToOneField(ChallengeResource, attribute='challengeID' , related_name='challengeID', full=True, null=True)
	class Meta:
		queryset = Answer.objects.all()
		resource_name = 'answer'
		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		#authentication = BasicAuthentication()
		always_return_data = True
		filtering = {
			'userID': ALL
		}

	def dehydrate(self, bundle):
		serializers = Serializer(formats=['xml', 'json'])
		vote = [st.__dict__ for st in Vote.objects.filter(answerID=bundle.obj)] #serializers.serialize('json', Answer.objects.filter(userID=bundle.obj))
		bundle.data['vote'] = vote
		return bundle

	
	def build_filters(self, filters=None):
		# This is a personnal filter which permit to filter tags by letters in it. Eg : tag=ences => get "sciences"
		if filters is None:
			filters = {}

		orm_filters = super(AnswerResource, self).build_filters(filters)

		if 'userID' in filters:
		  orm_filters['userID__exact'] = filters['userID']
		return orm_filters


class PhotoResource(ModelResource):
	answerID = fields.OneToOneField(AnswerResource, attribute='answerID' , related_name='answerID', full=True)
	class Meta:
		queryset = Photo.objects.all()
		resource_name = 'photo'

		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		always_return_data = True

	def hydrate(self, bundle):
		print 'la'
		#self.method_check(request, allowed=['post'])

		# Verifier qu'il y a un champ image dans bundle
		# Faire l'upload


		# A deserialiser : bundle.obj.image
		data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))

		#image = data.get('image', '')
		if "image" in bundle.data:
			#filename =   "blop.jpg"
			print bundle.data['image']
			filename = "%s.jpg" % (self.answerID_id)
			fh = file(filename,"wb" ) #timestamp + id
			fh = open(filename, "wb")
			fh.write(bundle.data['image'].decode('base64'))
			#fh.write(base64.b64decode(bundle.data['image']))
			fh.close()

			# Changer le bundle.obj.image en mettant a la place l'URL de l'image uploadee
			bundle.obj.image = filename

		else:
			print 'pas de donnees dans image '

		return bundle


class VoteResource(ModelResource):
	answerID = fields.ToOneField(AnswerResource, attribute='answerID' , related_name='answerID', full=True, null=True)
	class Meta:
		queryset = Vote.objects.all()
		resource_name = 'vote'
		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		#authentication = BasicAuthentication()
		always_return_data = True
		#fields=['author','description','title']