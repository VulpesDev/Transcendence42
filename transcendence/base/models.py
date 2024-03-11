from django.db import models
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

class UserData(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	draws = models.IntegerField(default=0)
      
	def __str__(self):
		return self.user.username

class RPSGame(models.Model):
	result = models.CharField(max_length=20)
	score = models.CharField(max_length=20)
	against = models.CharField(max_length=20)

class PongGame(models.Model):
	result = models.CharField(max_length=20)
	score = models.CharField(max_length=20)
	against = models.CharField(max_length=20)

# class User(AbstractUser):
# 	name = models.CharField(max_length=200, null=True)
# 	email = models.EmailField(unique=True, null=True)
# 	bio = models.TextField(null=True)
# 	avatar = models.CharField(max_length=200, null=True, default="../../static/assets/img/profile.png")
# 	field_color = models.CharField(max_length=20, null=True, default="blue")
# 	pong_history = models.ForeignKey(PongGame, on_delete=models.SET_NULL, null=True)
# 	rps_history = models.ForeignKey(RPSGame, on_delete=models.SET_NULL, null=True)

# 	USERNAME_FIELD = 'email'
# 	REQUIRED_FIELDS = ['username', 'name']
	