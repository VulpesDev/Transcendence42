from django.urls import path
from . import views

urlpatterns = [
    # path('login/', views.loginPage, name="login"),
    # path('logout/', views.logoutUser, name="logout"),
    # path('register/', views.registerPage, name="register"),

    path('', views.home, name="home"),
    path('login/', views.loginPage, name="login"),
    path('pong/', views.pong, name="pong"),
    path('games/', views.games, name="games"),
    path('chat/', views.chat, name="chat"),
    path('drum/', views.drum, name="drum"),
]
