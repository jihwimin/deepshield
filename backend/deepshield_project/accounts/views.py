# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from .forms import CustomUserCreationForm

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # creates the user
            # optionally, log the user in immediately:
            login(request, user)
            return redirect('home')  # or wherever you want to redirect
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

# For login & logout, you can use Django’s built-in class-based views:
class CustomLoginView(auth_views.LoginView):
    template_name = 'accounts/login.html'

class CustomLogoutView(auth_views.LogoutView):
    # can specify a next_page or template_name
    next_page = reverse_lazy('home')
