from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('register/', views.registerPage, name="register"),

    path('', views.home, name="home"),
    path('pong/', views.pong, name="pong"),
    path('games/', views.games, name="games"),
    path('chat/', views.chat, name="chat"),
    path('rps/', views.rps, name="rps"),
    path('multi/', views.multi, name="rps"),
    path('profile/', views.profile, name="rps"),
    path('stats/', views.stats, name="rps"),
    path('editprofile/', views.edit_profile, name="rps"),
]
