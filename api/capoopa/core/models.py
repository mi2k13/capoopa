from django.db import models
#from django.contrib.auth.models import User

# Create your models here. django.hote
class User(models.Model):
	#ID = models.CharField(max_length=4)
	email = models.CharField(max_length=30)
	#descriptif = models.TextField()
	avatar = models.CharField(max_length=200)
	#password = models.CharField(max_length=30)
	#nbSuccess = models.IntegerField(max_length=200) 
	#nbFail = models.IntegerField(max_length=200) 
	#nbRate = models.IntegerField(max_length=200) 
	#nbAbuse = models.IntegerField(max_length=200) 
	
class Challenge(models.Model):
	title = models.CharField(max_length=20)
	description = models.TextField()
	author = models.ManyToManyField(User)
	#beginning = models.IntegerField(max_length=200)
	#end = models.IntegerField(max_length=200)
	#category = models.CharField(max_length=200) # cree un dico de differentes valus pour les enums
	#nbAbuse = models.IntegerField(max_length=200) 
	#nbAnswer = models.IntegerField(max_length=200)
	#type = models.CharField(max_length=200)
	
class Answer(models.Model):
	userID = models.ForeignKey(User)
	challengeID = models.ForeignKey(Challenge)
	status = models.CharField(max_length=10)
	image = models.CharField(max_length=20000, blank=True)
	#media = models.IntegerField(max_length=200)
	#nbAbuse = models.IntegerField(max_length=200)

	

	

