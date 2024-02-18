from django.shortcuts import render

def pong_game(request):
    return render(request, 'pong/pong_game.html')

from django.http import HttpResponse
from django.conf import settings
import os

def pong_game_js(request):
    # Path to the pong_game.js file
    js_file_path = os.path.join(settings.STATIC_ROOT, 'pong', 'js', 'pong_game.js')

    # Open and read the contents of the JavaScript file
    with open(js_file_path, 'r') as js_file:
        js_contents = js_file.read()

    # Create an HttpResponse with the JavaScript contents and content type 'text/javascript'
    response = HttpResponse(js_contents, content_type='text/javascript')
    return response

def my_view(request):
    js_file_path = os.path.join(settings.STATIC_ROOT, 'pong/js/pong_game.js')
    timestamp = os.path.getmtime(js_file_path) if os.path.exists(js_file_path) else None
    return render(request, 'my_template.html', {'timestamp': timestamp})
