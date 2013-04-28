from django.db import models
#from django.contrib.auth.models import User

# Create your models here. django.hote
class User(models.Model):
  email = models.CharField(max_length=30)
  password = models.CharField(max_length=30)
  nickname = models.CharField(max_length=30, blank=True, null=True)
  avatar = models.CharField(max_length=100, blank=True, null=True)
  friends = models.ManyToManyField("self")

class Challenge(models.Model):
  title = models.CharField(max_length=20)
  description = models.TextField()
  author = models.ForeignKey(User)
  beginning = models.IntegerField(max_length=12)
  duration = models.IntegerField(max_length=12)
  category = models.CharField(max_length=15) # cree un dico de differentes valus pour les enums
  nbAbuse = models.IntegerField(max_length=5, blank=True, null=True) 
  type = models.CharField(max_length=6)
  private = models.BooleanField()
  group = models.ForeignKey("Group", blank=True, null=True)

  def __unicode__(self):
    return self.title

class Answer(models.Model):
  user = models.ForeignKey(User)
  challenge = models.ForeignKey(Challenge)
  status = models.CharField(max_length=10)
  image = models.FileField(upload_to="answers", blank=True, null=True)
  #nbAbuse = models.IntegerField(max_length=200, blank=True, null=True)

class Vote(models.Model):
  answer = models.ForeignKey(Answer, related_name='answer')
  Vote = models.IntegerField(max_length=5, blank=True, null=True)

class Group(models.Model):
  title = models.CharField(max_length=30)
  owner = models.ForeignKey("User", related_name='owner')
  members = models.ManyToManyField("User", blank=True, null=True)