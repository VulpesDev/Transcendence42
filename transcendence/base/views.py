from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import MyUserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import PongGame, RPSGame

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
    specific_user_data = users_data[2]
    print(specific_user_data)
    return render(request, "pong/pong.html", {'specific_user_data':
     specific_user_data})

@login_required(login_url='login')
def pong_4(request):
    specific_user_data = users_data[2]
    print(specific_user_data)
    return render(request, "pong/pong_4.html", {'specific_user_data':
     specific_user_data})

@login_required(login_url='login')
def pong_ai(request):
    specific_user_data = users_data[2]
    print(specific_user_data)
    return render(request, "pong/pong_ai.html", {'specific_user_data':
     specific_user_data})

@login_required(login_url='login')
def chat(request):
	return render(request, "chat/chat.html")

@login_required(login_url='login')
def games(request):
	return render(request, "games/games.html")

@login_required(login_url='login')
def rps(request):
	return render(request, "rps/rps.html")

@login_required(login_url='login')
def rps_2(request):
	return render(request, "rps/rps_2.html")

@login_required(login_url='login')
def stats(request):
    pong_history = PongGame.objects.all()
    return render(request, "stats/stats.html", {'game_history': pong_history})

@login_required(login_url='login')
def profile(request):
    if request.method == 'POST':
        field_color = request.POST.get('field_color')
        print(field_color)
        users_data[2]['field_color'] = field_color
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
