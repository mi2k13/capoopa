from django.db import models
#from django.contrib.auth.models import User

# Create your models here. django.hote
class User(models.Model):
	email = models.CharField(max_length=30)
	password = models.CharField(max_length=30)
	nickname = models.CharField(max_length=30)
	description = models.TextField()
	avatar = models.CharField(max_length=100, blank=True)
	nbRate = models.IntegerField(max_length=5, default='0') 

class Challenge(models.Model):
	title = models.CharField(max_length=20)
	description = models.TextField()
	author = models.ForeignKey(User)
	beginning = models.IntegerField(max_length=10)
	end = models.IntegerField(max_length=10)
	category = models.CharField(max_length=15) # cree un dico de differentes valus pour les enums
	nbAbuse = models.IntegerField(max_length=5, default='0') 
	nbAnswer = models.IntegerField(max_length=5, default='0')
	type = models.CharField(max_length=6)

class Answer(models.Model):
	userID = models.ForeignKey(User)
	challengeID = models.ForeignKey(Challenge)
	status = models.CharField(max_length=10)
	image = models.TextField(blank=True)
	#media = models.IntegerField(max_length=200)
	nbAbuse = models.IntegerField(max_length=200, blank=True, default='0')
