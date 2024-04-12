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
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = PongGame(name=request.user, result=result, score=score, against=against)
        game.save()
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_4.html", {'users_data': users_data})

# @login_required(login_url='login')
# def pong_ai(request):
#     if request.method == "POST":
#         print(request.POST.all())
#     users_data = User.objects.get(username=request.user)
#     return render(request, "pong/pong_ai.html", {'users_data': users_data})
@login_required(login_url='login')
def pong_ai(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = PongGame(name=request.user, result=result, score=score, against=against)
        game.save()
    users_data = User.objects.get(username=request.user)
    return render(request, "pong/pong_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def games(request):
	return render(request, "games/games.html")

@login_required(login_url='login')
def ttt(request):
	return render(request, "ttt/ttt.html")
    
@login_required(login_url='login')
def ttt_new(request):
	return render(request, "ttt/ttt_new.html")

@login_required(login_url='login')
def ttt_ai(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = TTTGame(name=request.user, result=result, score=score, against=against)
        game.save()
        print(game)
    users_data = User.objects.get(username=request.user)
    print(users_data)
    return render(request, "ttt/ttt_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def ttt_new_ai(request):
    if request.method == "POST":
        result = request.POST.get('winner')
        score = request.POST.get('result')
        against = request.POST.get('against')
        game = TTTGame(name=request.user, result=result, score=score, against=against)
        game.save()
        print(game)
    users_data = User.objects.get(username=request.user)
    print(users_data)
    return render(request, "ttt/ttt_new_ai.html", {'users_data': users_data})

@login_required(login_url='login')
def stats(request):
    if request.user.is_authenticated:
        logged_in_user = request.user
        pong_history = PongGame.objects.filter(name=logged_in_user)
        ttt_history = TTTGame.objects.filter(name=logged_in_user)
        pong_win = pong_history.filter(result='win').count()
        pong_draw = pong_history.filter(result='draw').count()
        pong_lose = pong_history.filter(result='lose').count()
        ttt_win = ttt_history.filter(result='win').count()
        ttt_draw = ttt_history.filter(result='draw').count()
        ttt_lose = ttt_history.filter(result='lose').count()
        pong_history_last_8 = list(pong_history.order_by('-id')[:8])
        print(ttt_history)
        context = {'pong_history': pong_history_last_8, 'pong_win': pong_win, 'pong_draw': pong_draw, 'pong_lose': pong_lose, 'ttt_history': ttt_history, 'ttt_win': ttt_win, 'ttt_draw': ttt_draw, 'ttt_lose': ttt_lose}
    return render(request, "stats/stats.html", context)


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
    if request.method == 'POST':
        if request.POST.get('email') != '':
            email = request.POST.get('email')
        if request.POST.get('avatar') != '':
            avatar = request.POST.get('avatar')
        if request.POST.get('bio') != '':
            bio = request.POST.get('bio')
        user = User.objects.get(username=request.user)
        user.email = email
        user.avatar = avatar
        user.bio = bio
        user.save()
        print('Profile edited')
    # Fetch user's data
    user = User.objects.get(username=request.user)
    
    # Pass user's data to the template context
    print(user.email, 'user email', user.username, 'user username', user.bio, 'user bio')
    print(User.objects.all(), 'all users', User.objects.get(username = request.user), 'current user')
    # context = {
    #     'user': user_data,
    #     'email': user_data.email,
    #     # 'avatar': user_data.profile.avatar,
    #     # 'bio': user_data.profile.bio,
    # }
    # print (context)
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
