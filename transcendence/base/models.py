from django.db import models
from django.contrib.auth.models import User

class UserData(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	wins = models.IntegerField(default=0)
	loses = models.IntegerField(default=0)
	draws = models.IntegerField(default=0)
      
	def __str__(self):
		return self.user.username
# class User(AbstractUser):
#     name = models.CharField(max_length=200, null=True)
#     email = models.EmailField(unique=True, null=True)
#     bio = models.TextField(null=True)

#     avatar = models.ImageField(null=True, default="avatar.svg")

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     def __str__(self):
#         return self.username