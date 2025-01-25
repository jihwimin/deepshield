# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model that uses 'username' for login
    and has a separate 'display_name' (nickname) for public display.
    """
    display_name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        # Show the username and the display_name in admin or shell
        return f"{self.username} ({self.display_name})"
