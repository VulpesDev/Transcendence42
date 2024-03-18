from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from .forms import MyUserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import PongGame, TTTGame, User

users = [
    {"id": 1, "username": "user1", "email": "user1@example.com", "password": "user1","bio": "I am a software developer", "field_color": "blue"},
    {"id": 2, "username": "user2", "email": "user2@example.com", "password": "user2","bio": "I am a software developer", "field_color": "white"},
    {"id": 2, "username": "elias", "email": "elias", "password": "elias", "bio": "I am a software developer", "field_color": "green"},
]

users_data = [
    {"id": 1, "username": "user1", "email": "user1@example.com", "password": "user1","bio": "I am a software developer", "field_color": "blue"},
    {"id": 2, "username": "user2", "email": "user2@example.com", "password": "user2","bio": "I am a software developer", "field_color": "white"},
    {"id": 2, "username": "elias", "email": "elias", "password": "elias", "bio": "I am a software developer", "field_color": "blue"},
]
    # Dummy game history data
game_history = [
        {'result': 'win', 'score': '8 : 6', 'against': 'Adriansadasds'},
        {'result': 'lose', 'score': '4 : 10', 'against': 'John'},
        {'result': 'lose', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'lose', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'win', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'win', 'score': '9 : 1', 'against': 'Emily'},
        {'result': 'lose', 'score': '7 : 7', 'against': 'Emily'},
        {'result': 'win', 'score': '7 : 7', 'against': 'Emily'},
        {'result': 'draw', 'score': '7 : 7', 'against': 'Emily'},
        {'result': 'draw', 'score': '7 : 7', 'against': 'Emily'},
        # Add more game results here...
    ]

# Create your views here.
def home(request):
	return render(request, "home/home.html")

@login_required(login_url='login')
def pong(request):
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong.html", {'users_data': users_data})

@login_required(login_url='login')
def pong_4(request):
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_4.html", {'users_data': users_data})

@login_required(login_url='login')
def pong_ai(request):
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def games(request):
	return render(request, "games/games.html")

@login_required(login_url='login')
def ttt(request):
	return render(request, "ttt/ttt.html")

@login_required(login_url='login')
def ttt_ai(request):
	return render(request, "ttt/ttt_ai.html")

@login_required(login_url='login')
def stats(request):
    if request.user.is_authenticated:
        logged_in_user = request.user
        pong_history = PongGame.objects.filter(name=logged_in_user)
        print(pong_history)
    return render(request, "stats/stats.html", {'game_history': pong_history})

@login_required(login_url='login')
def profile(request):
    if request.method == 'POST':
        field_color = request.POST.get('field_color')
        user = User.objects.get(username=request.user)
        user.field_color = field_color
        user.save()
        print('Color changed to', user.field_color)
    return render(request, "profile/profile.html", {'users_data': users_data})

@login_required(login_url='login')
def edit_profile(request):
	return render(request, "edit_profile/edit_profile.html")

def loginPage(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('/games')

    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'User does not exist')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/games')
        else:
            messages.error(request, 'Username OR password does not exit')

    context = {'page': page}
    return render(request, 'login_register.html', context)

def registerPage(request):
    form = MyUserCreationForm()
    if request.method == 'POST':
        form = MyUserCreationForm(request.POST)
        print(form)
        print(form.is_valid())
        if form.is_valid():
            print('form is valid')
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('/games')
        else:
            print('form is not valid')
            messages.error(request, 'An error occurred during registration')

    return render(request, 'login_register.html', {'form': form})

def logoutUser(request):
    logout(request)
    return redirect('home')
