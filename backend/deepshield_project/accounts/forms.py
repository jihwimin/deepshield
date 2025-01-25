# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'display_name', 'email')  
        # 'username' is for login, 'display_name' is the nickname, 'email' optional if you want it.

    def save(self, commit=True):
        user = super().save(commit=False)
        # any additional logic or validation here
        if commit:
            user.save()
        return user
