from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from django.conf.urls import *
from core.models import Challenge
from core.models import Answer
from core.models import User
from tastypie.authorization import DjangoAuthorization
#from tastypie.authentication import BasicAuthentication
from tastypie.authorization import Authorization
from tastypie import fields

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
	#answers = fields.ManyToManyField('AnswerResource', attribute='answers' , related_name='answers', full=True, null=True)

	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		#authentication = BasicAuthentication()
		always_return_data = True


	def dehydrate(self, bundle):

		#bundle.data['answers'] = Answer.objects.filter(userID=bundle.obj)
		serializers = Serializer(formats=['xml', 'json'])
		bundle.data['answers'] = [st.__dict__ for st in Answer.objects.filter(userID=bundle.obj)] #serializers.serialize('json', Answer.objects.filter(userID=bundle.obj))
		#bundle.data['challenge']= [st.__dict__ for st in Challenge.objects.filter(author=bundle.obj)])
		# tentative pour Serialiser (transformer en JSON) l'objet
		#Serializer.serialize(self, bundle, format='application/json', options={})
		#Serializer.to_json(self, bundle, options=None)
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




class AnswerResource(ModelResource):
	userID = fields.OneToOneField(UserResource, attribute='userID' , related_name='userID', full=True)
	challengeID = fields.OneToOneField(ChallengeResource, attribute='challengeID' , related_name='challengeID', full=True)
	class Meta:
		queryset = Answer.objects.all()
		resource_name = 'answer'

		allowed_methods = ['get','post']
		serializer = Serializer(formats=['xml', 'json'])
		authorization= Authorization()
		#authentication = BasicAuthentication()
		always_return_data = True

	def hydrate(self, bundle):
		print 'la'
		#self.method_check(request, allowed=['post'])

		# Verifier qu'il y a un champ image dans bundle
		# Faire l'upload


		# A deserialiser : bundle.obj.image
		#data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))

		#image = data.get('image', '')
		if "image" in bundle.data:
			#filename =   "blop.jpg"
			print bundle.data['image']
			filename = "%s%s.jpg" % (bundle.obj.pk, time.time()) 
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
