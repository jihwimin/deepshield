# accounts/urls.py
from django.urls import path
from .views import register_view, CustomLoginView, CustomLogoutView

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
]
