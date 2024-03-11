from django.contrib import admin

# Register your models here.

from .models import RPSGame, PongGame, User

admin.site.register(User)
admin.site.register(RPSGame)
admin.site.register(PongGame)