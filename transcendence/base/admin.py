from django.contrib import admin

# Register your models here.

from .models import RPSGame, PongGame

admin.site.register(RPSGame)
admin.site.register(PongGame)