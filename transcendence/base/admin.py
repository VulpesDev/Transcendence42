from django.contrib import admin

# Register your models here.

from .models import TTTGame, PongGame, User

admin.site.register(User)
admin.site.register(TTTGame)
admin.site.register(PongGame)