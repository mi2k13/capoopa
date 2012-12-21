from tastypie.resources import ModelResource
from core.models import Challenge
from core.models import User
from core.models import Answer
from tastypie.authorization import Authorization
from django.contrib.auth.models import User
from tastypie import fields

class UserSimple(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'

		

class ChallengeResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    class Meta:
        queryset = Challenge.objects.all()
        resource_name = 'challenge'

		
class UserResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'

		
class AnswerResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    class Meta:
        queryset = Answer.objects.all()
        resource_name = 'answer'