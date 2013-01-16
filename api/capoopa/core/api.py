from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from django.conf.urls import *
from core.models import Challenge
from core.models import Answer
from core.models import User
from tastypie.authorization import DjangoAuthorization
from tastypie.authorization import Authorization
from tastypie import fields

from tastypie.serializers import Serializer


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

	def dehydrate(self, bundle):

		bundle.data['answers'] = Answer.objects.filter(userID=bundle.obj)
		# tentative pour Serialiser (transformer en JSON) l'objet
		#Serializer.serialize(self, bundle, format='application/json', options={})
		#Serializer.to_json(self, bundle, options=None)
		return bundle
	
	#choices are : answer, author, description, id, title
	def prepend_urls(self):
		return [
			url(r"^(?P<resource_name>%s)/(?P<id>[\w\d_.-]+)/$" % self._meta.resource_name, self.wrap_view('dispatch_detail'), name="api_dispatch_detail"),
		]	

class ChallengeResource(ModelResource):
	author = fields.OneToOneField(UserResource, attribute='author' , related_name='author', full=True)
	#users = fields.ForeignKey(UserResource, attribute='users', full=True, null=True)
	class Meta:
		queryset = Challenge.objects.all()
		resource_name = 'challenge'
		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		#fields=['author','description','title']

	#choices are : answer, author, description, id, title
	def prepend_urls(self):
		return [
			url(r"^(?P<resource_name>%s)/(?P<id>[\w\d_.-]+)/$" % self._meta.resource_name, self.wrap_view('dispatch_detail'), name="api_dispatch_detail"),
		]
	

class AnswerResource(ModelResource):
	userID = fields.OneToOneField(UserResource, attribute='userID' , related_name='userID', full=True)
	challengeID = fields.OneToOneField(ChallengeResource, attribute='challengeID' , related_name='challengeID', full=True)
	class Meta:
		queryset = Answer.objects.all()
		resource_name = 'answer'

		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()

	#Choices are : challengeID, id, status, userID
	 #def prepend_urls(self):
		# return [
		#	 url(r"^(?P<resource_name>%s)/(?P<userID>[\w\d_.-]+)/$" % self._meta.resource_name, self.wrap_view('dispatch_detail'), name="api_dispatch_detail"),
		 #]

