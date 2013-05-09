from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.conf.urls import *
from django.core.files import File
from django.core.files.base import ContentFile
from django.db.models import Q
from core.models import Challenge
from core.models import Answer
from core.models import User
from core.models import Vote
from core.models import Group
from tastypie.authorization import Authorization
from tastypie import fields
from tastypie.utils import trailing_slash


from tastypie.resources import ALL, ALL_WITH_RELATIONS

from tastypie.serializers import Serializer
import time
import base64
import os


class UserResource(ModelResource):

  class Meta:
    queryset = User.objects.all()
    resource_name = 'user'
    allowed_methods = ['get','post']
    serializer = Serializer(formats=['json'])

    authorization= Authorization()
    always_return_data = True

    filtering = {
      'email': ALL_WITH_RELATIONS
    }

  def prepend_urls(self):
    return [
      url(r'^(?P<resource_name>%s)/search%s$' %(self._meta.resource_name, trailing_slash()),self.wrap_view('search'), name='api_search'),
      url(r'^(?P<resource_name>%s)/addFriend%s$' %(self._meta.resource_name, trailing_slash()),self.wrap_view('addFriend'), name='api_addFriend'),
      url(r'^(?P<resource_name>%s)/getGroups%s$' %(self._meta.resource_name, trailing_slash()),self.wrap_view('getGroups'), name='api_getGroups'),
      ]

  def search(self, request, **kwargs):
    self.method_check(request, allowed=['post'])
    data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))
    search = data.get('search', '')

    user = [st.__dict__ for st in User.objects.filter(Q(nickname__icontains=search) | Q(email__icontains=search))]
    return self.create_response(request, {
      'objects': user
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

  def getGroups(self, request, **kwargs):
    self.method_check(request, allowed=['get'])
    userID = request.GET['userID']
    user = User.objects.get(id=userID)
    sqsGroup = Group.objects.filter(owner=user)
    if sqsGroup:
      return self.create_response(request, {
        'success': True,
        'groups': [group.__dict__ for group in sqsGroup]
        })
    else:
      return self.create_response(request, {
        'success': False,
        'groups': []
        })

  def dehydrate(self, bundle):
    userID = bundle.obj
    bundle.data['nbCompleted'] = Answer.objects.filter(user=userID, status="completed").count()
    bundle.data['nbFailed'] = Answer.objects.filter(user=userID, status="failed").count()
    bundle.data['friends'] = [friend.__dict__ for friend in bundle.obj.friends.all().order_by('nickname')]
    return bundle



class GroupResource(ModelResource):
  owner = fields.ToOneField(UserResource, attribute='owner' , related_name='owner', full=True)
  members = fields.ToManyField(UserResource, attribute=lambda bundle: User.objects.all())

  class Meta:
    queryset = Group.objects.all()
    resource_name = 'group'
    allowed_methods = ['get','post']
    serializer = Serializer(formats=['json'])
    authorization= Authorization()
    always_return_data = True
    filtering = {
      'owner': ALL_WITH_RELATIONS
    }

  def createGroup(self, request, **kwargs):
    self.method_check(request, allowed=['post'])
    data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))
    owner = User.objects.get(id=data.get('owner'))
    title = data.get('title')
    members = data.get('members')
    group = Group(title=title, owner=owner)
    group.save()
    for member in members:
      member = User.objects.get(id=member)
      group.members.add(member)
    group.save()

    return self.create_response(request, {
          'success': True
          })

  def prepend_urls(self):
    return [
    url(r"^(?P<resource_name>%s)/createGroup%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('createGroup'), name="api_createGroup")
   ]

  def build_filters(self, filters=None):
    if filters is None:
      filters = {}
    orm_filters = super(GroupResource, self).build_filters(filters)
    if 'owner' in filters:
      orm_filters['owner__exact'] = filters['owner']
    return orm_filters

  def dehydrate(self, bundle):
    bundle.data['members'] = [members.__dict__ for members in bundle.obj.members.all()]
    return bundle



class ChallengeResource(ModelResource):
  author = fields.ToOneField(UserResource, attribute='author' , related_name='author', full=True)

  class Meta:
    queryset = Challenge.objects.all()
    resource_name = 'challenge'
    allowed_methods = ['get','post','delete']
    serializer = Serializer(formats=['json'])
    authorization= Authorization()
    always_return_data = True

  def prepend_urls(self):
    return [
    url(r"^(?P<resource_name>%s)/getChallenges%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('getChallenges'), name="api_getChallenges"),
    url(r"^(?P<resource_name>%s)/createChallenge%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('createChallenge'), name="api_createChallenge")
   ]

  def dehydrate(self, bundle):
    challengeID = bundle.obj
    bundle.data['nbAnswers'] = Answer.objects.filter(challenge=challengeID).count()
    if bundle.obj.group:
      bundle.data['group'] = bundle.obj.group.__dict__
    return bundle

  def createChallenge(self, request, **kwargs):
    self.method_check(request, allowed=['post'])
    data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))
    title = data.get('title')
    description = data.get('description')
    author = User.objects.get(id=data.get('authorID'))
    beginning = data.get('beginning')
    duration = data.get('duration')
    category = data.get('category')
    nbAbuse = data.get('nbAbuse')
    type = data.get('type')
    privacy = data.get('privacy')
    if data.get('groupID'):
      group = Group.objects.get(id=data.get('groupID'))
    else:
      group = None
    challenge = Challenge(title=title, description=description, author=author, beginning=beginning, duration=duration, category=category, nbAbuse=nbAbuse, type=type, private=privacy, group=group)
    challenge.save()
    return self.create_response(request, {
          'challengeID': challenge.id,
          'success': True
          })

  def getChallenges(self, request, **kwargs):
    self.method_check(request, allowed=['get'])
    userID = request.GET['userID']
    user = User.objects.get(id=userID)
    sqsAnswer = Answer.objects.filter(user=user)
    if sqsAnswer:
      sqsAnswer = [ans for ans in sqsAnswer]
      sqsChallenge = Challenge.objects.exclude(id__in=[ans.challenge.id for ans in sqsAnswer])
      challenges = [challenge.__dict__ for challenge in sqsChallenge]
      for challenge in challenges:
        challenge['nbAnswers'] = Answer.objects.filter(challenge=challenge['id']).count()
      if sqsChallenge:
        return self.create_response(request, {
          'success': True,
          'objects': challenges
          })
      else:
        return self.create_response(request, {
          'success': False,
          'objects': []
          })

    else:
      sqsChallenge = Challenge.objects.all()
      if sqsChallenge:
        return self.create_response(request, {
          'success': True,
          'objects': challenges
          })
      else:
        return self.create_response(request, {
          'success': False,
          'objects': []
          })


class AnswerResource(ModelResource):
  user = fields.OneToOneField(UserResource, attribute='user' , related_name='user', full=True, null=True)
  challenge = fields.OneToOneField(ChallengeResource, attribute='challenge' , related_name='challenge', full=True, null=True)
  class Meta:
    queryset = Answer.objects.all()
    resource_name = 'answer'
    allowed_methods = ['get','post','delete']
    serializer = Serializer(formats=['json'])
    authorization= Authorization()
    always_return_data = True
    filtering = {
      'userID': ALL
    }

  def prepend_urls(self):
    return [
    url(r"^(?P<resource_name>%s)/getRandomAnswer%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('getRandomAnswer'), name="api_getRandomAnswer"),
    url(r"^(?P<resource_name>%s)/addImage%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('addImage'), name="api_addImage"),
    url(r"^(?P<resource_name>%s)/getImage%s$" %(self._meta.resource_name, trailing_slash()),self.wrap_view('getImage'), name="api_getImage"),
   ]

  def dehydrate(self, bundle):
    #vote = [st.__dict__ for st in Vote.objects.filter(answer=bundle.obj)] #serializers.serialize('json', Answer.objects.filter(userID=bundle.obj))
    #bundle.data['vote'] = vote
    return bundle
  
  def build_filters(self, filters=None):
    if filters is None:
      filters = {}
    orm_filters = super(AnswerResource, self).build_filters(filters)
    if 'userID' in filters:
      orm_filters['user__exact'] = filters['userID']
    return orm_filters

  def getRandomAnswer(self, request, **kwargs):
    self.method_check(request, allowed=['get'])
    userID = request.GET['userID']
    user = User.objects.get(id=userID)
    sqsAnswer = Answer.objects.exclude(user=user).order_by('?')[:1]
    print "pute"
    print sqsAnswer
    if sqsAnswer:
      return self.create_response(request, {
        'success': True,
        'objects': [answer.__dict__ for answer in sqsAnswer]
        })
    else:
      return self.create_response(request, {
        'success': False,
        'objects': []
        })


  def getImage(self, request, **kwargs):
    self.method_check(request, allowed=['get'])
    answer = Answer.objects.get(id=1)
    return self.create_response(request, {
        'name': answer.image.name,
        'url': answer.image.url,
        'path': answer.image.path
        })

  def addImage(self, request, **kwargs):
    self.method_check(request, allowed=['post'])
    data = self.deserialize(request, request.raw_post_data, format=request.META.get('CONTENT_TYPE', 'application/json'))
    image64 = data.get('image')
    answer = Answer.objects.get(id=data.get('answerID'))
    fh = open("temporaire.jpg", "wb")
    fh.write(image64.decode('base64')) # decode et creation de l'img
    fh.close()
    if fh.closed:
      fh = open("temporaire.jpg", "r") #ouverture en lecture
      content_file = ContentFile(fh.read()) #ecriture du contenu du fichier
      answer.image.save('answer.jpg', content_file)
      answer.status = 'over'
      answer.save()
      fh.close()
    if fh.closed:
      os.remove(unicode(fh.name))
      del fh
    return self.create_response(request, {
          'success': True
          })


class VoteResource(ModelResource):
  answerID = fields.ToOneField(AnswerResource, attribute='answerID' , related_name='answerID', full=True, null=True)
  class Meta:
    queryset = Vote.objects.all()
    resource_name = 'vote'
    allowed_methods = ['get','post']
    serializer = Serializer(formats=['xml', 'json'])
    authorization= Authorization()
    always_return_data = True