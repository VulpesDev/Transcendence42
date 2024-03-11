from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('register/', views.registerPage, name="register"),

    path('', views.home, name="home"),
    path('pong/', views.pong, name="pong"),
    path('pong_4/', views.pong_4, name="pong"),
    path('pong_ai/', views.pong_ai, name="pong"),
    path('games/', views.games, name="games"),
    path('chat/', views.chat, name="chat"),
    path('rps/', views.rps, name="rps"),
    path('rps_2/', views.rps_2, name="rps"),
    path('profile/', views.profile, name="rps"),
    path('stats/', views.stats, name="rps"),
    path('editprofile/', views.edit_profile, name="rps"),
]
