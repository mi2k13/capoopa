from tastypie.resources import ModelResource
from core.models import Challenge
from core.models import User
from core.models import Answer


class ChallengeResource(ModelResource):
    class Meta:
        queryset = Challenge.objects.all()
        resource_name = 'challenge'
		
class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
		
class AnswerResource(ModelResource):
    class Meta:
        queryset = Answer.objects.all()
        resource_name = 'answer'