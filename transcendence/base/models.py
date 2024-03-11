from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	name = models.CharField(max_length=200, null=True)
	email = models.EmailField(unique=True, null=True)
	bio = models.TextField(null=True)
	avatar = models.CharField(max_length=200, null=True, default="../../static/assets/img/profile.png")
	field_color = models.CharField(max_length=20, null=True, default="blue")

	REQUIRED_FIELDS = []

class RPSGame(models.Model):
	name = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	result = models.CharField(max_length=20)
	score = models.CharField(max_length=20)
	against = models.CharField(max_length=20)

class PongGame(models.Model):
	name = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	result = models.CharField(max_length=20)
	score = models.CharField(max_length=20)
	against = models.CharField(max_length=20)

	
