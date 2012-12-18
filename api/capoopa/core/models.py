from django.db import models

# Create your models here. django.hote

class Challenge(models.Model):
	title = models.CharField(max_length=200)
	description = models.TextField()
	author = models.CharField(max_length=200)
	#beginning = models.IntegerField(max_length=200)
	#end = models.IntegerField(max_length=200)
	#category = models.CharField(max_length=200) # cree un dico de differentes valus pour les enums
	#nbAbuse = models.IntegerField(max_length=200) 
	#nbAnswer = models.IntegerField(max_length=200)
	#type = models.CharField(max_length=200)
	
class User(models.Model):
	email = models.CharField(max_length=200)
	password = models.CharField(max_length=200)
	nickname = models.CharField(max_length=200)
	#description = models.IntegerField(max_length=200)
	#avatar = models.IntegerField(max_length=200)
	#nbChallenge = models.CharField(max_length=200) # cree un dico de differentes valus pour les enums
	#nbAbuse = models.IntegerField(max_length=200) 
	
class Answer(models.Model):
	userID = models.ForeignKey(User)
	challengeID = models.ForeignKey(Challenge)
	status = models.CharField(max_length=200)
	#media = models.IntegerField(max_length=200)
	#nbAbuse = models.IntegerField(max_length=200) 
