from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import MyUserCreationForm, UserForm
from django.contrib.auth.decorators import login_required


users = [
    {"id": 1, "username": "user1", "email": "user1@example.com", "password": "user1"},
    {"id": 2, "username": "user2", "email": "user2@example.com", "password": "user2"},
    {"id": 2, "username": "elias", "email": "elias", "password": "elias"},
]

# Create your views here.
def home(request):
	return render(request, "home/home.html")

@login_required(login_url='login')
def pong(request):
	return render(request, "pong/pong.html")

@login_required(login_url='login')
def chat(request):
	return render(request, "chat/chat.html")

@login_required(login_url='login')
def games(request):
	return render(request, "games/games.html")

@login_required(login_url='login')
def rps(request):
	return render(request, "rps/rps.html")

def loginPage(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('games')

    if request.method == 'POST':
        email = request.POST.get('username')
        password = request.POST.get('password')
        print(email, password)

        user = next((u for u in users if u["email"] == email and u["password"] == password), None)

        if user:
            user_object = authenticate(request, username=user["username"], password=password)
            if user_object is not None:
                login(request, user_object)
                print('User authentication successful')
                return redirect('games')
            else:
                print('User authentication failed')
                messages.error(request, 'User authentication failed')
        else:
            print('Invalid email or password')
            messages.error(request, 'Invalid email or password')

    context = {'page': page}
    return render(request, 'login_register.html', context)

def logoutUser(request):
    logout(request)
    return redirect('home')

# def loginPage(request):
#     page = 'login'
#     if request.user.is_authenticated:
#         return redirect('games')
#     if request.method == 'POST':
#         email = request.POST.get('username')
#         password = request.POST.get('password')
#         print(email, password)

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             messages.error(request, 'User does not exist')
#             print('User does not exist')
#             return render(request, 'login_register.html', {'page': page})

#         user = authenticate(request, email=email, password=password)

#         if user is not None:
#             login(request, user)
#             return redirect('games')
#         else:
#             messages.error(request, 'Invalid email or password')

#     context = {'page': page}
#     return render(request, 'login_register.html', context)

def logoutUser(request):
    logout(request)
    return redirect('home')

def registerPage(request):
    form = MyUserCreationForm()

    if request.method == 'POST':
        form = MyUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'An error occurred during registration')

    return render(request, 'login_register.html', {'form': form})