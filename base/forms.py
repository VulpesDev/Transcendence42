from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import User

class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
        
 #class UserForm(ModelForm):
 #    class Meta:
 #        model = User
 #        fields = ['avatar', 'name', 'username', 'email', 'bio', 'field_color', 'pong_history', 'rps_history']