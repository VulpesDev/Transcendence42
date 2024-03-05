from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .forms import MyUserCreationForm, UserForm

# Create your views here.
def home(request):
	return render(request, "home/home.html")

def pong(request):
	return render(request, "pong/pong.html")

def chat(request):
	return render(request, "chat/chat.html")

def games(request):
	return render(request, "games/games.html")

def drum(request):
	return render(request, "drum/drum.html")

def loginPage(request):
    page = 'login'
    # if request.user.is_authenticated:
    #     return redirect('games')

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, 'User does not exist')
            return render(request, 'login_register.html', {'page': page})

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('games')
        else:
            messages.error(request, 'Invalid email or password')

    context = {'page': page}
    return render(request, 'login_register.html', context)

# def logoutUser(request):
#     logout(request)
#     return redirect('home')

# def registerPage(request):
#     form = MyUserCreationForm()

#     if request.method == 'POST':
#         form = MyUserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.username = user.username.lower()
#             user.save()
#             login(request, user)
#             return redirect('home')
#         else:
#             messages.error(request, 'An error occurred during registration')

#     return render(request, 'base/login_register.html', {'form': form})