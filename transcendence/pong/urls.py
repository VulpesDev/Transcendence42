# from django.urls import path
# from .views import pong_game

# urlpatterns = [
#     path('pong/', pong_game, name='pong_game'),
# ]

from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path("", views.pong_game, name="pong_game"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
