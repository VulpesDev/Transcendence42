from django.shortcuts import render

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
	return render(request, "login_register.html", context={"title": "Login"})