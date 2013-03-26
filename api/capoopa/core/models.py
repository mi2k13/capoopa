from django.db import models
#from django.contrib.auth.models import User

# Create your models here. django.hote
class User(models.Model):
	email = models.CharField(max_length=30)
	password = models.CharField(max_length=30)
	nickname = models.CharField(max_length=30, blank=True)
	description = models.TextField(blank=True)
	avatar = models.CharField(max_length=100, blank=True)
	nbRate = models.IntegerField(max_length=5)

class Challenge(models.Model):
	title = models.CharField(max_length=20)
	description = models.TextField()
	author = models.ForeignKey(User)
	beginning = models.IntegerField(max_length=12)
	duration = models.IntegerField(max_length=12)
	category = models.CharField(max_length=15) # cree un dico de differentes valus pour les enums
	nbAbuse = models.IntegerField(max_length=5, blank=True) 
	nbAnswer = models.IntegerField(max_length=5, blank=True)
	type = models.CharField(max_length=6)

	def __unicode__(self):
		return self.title

class Answer(models.Model):
	userID = models.ForeignKey(User)
	challengeID = models.ForeignKey(Challenge)
	status = models.CharField(max_length=10)
	#image = models.TextField(blank=True)
	#media = models.IntegerField(max_length=200)
	nbAbuse = models.IntegerField(max_length=200, blank=True)

class Photo(models.Model):
	answerID = models.ForeignKey(Answer)
	image = models.TextField(blank=True)

class Friend(models.Model):
	user = models.ForeignKey(User, related_name='user')
	friend = models.ForeignKey(User, related_name='friend')
