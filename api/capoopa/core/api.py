from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from core.models import Challenge
from core.models import Answer
from tastypie.authorization import DjangoAuthorization
from tastypie import fields


class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		authorization = DjangoAuthorization()


class ChallengeResource(ModelResource):
	#author = fields.ForeignKey(UserResource, 'user')
	class Meta:
		queryset = Challenge.objects.all()
		resource_name = 'challenge'


class AnswerResource(ModelResource):
	userID = fields.ForeignKey(UserResource, 'user')
	challengeID = fields.ForeignKey(ChallengeResource, 'challenge')
	class Meta:
		queryset = Answer.objects.all()
		resource_name = 'answer'