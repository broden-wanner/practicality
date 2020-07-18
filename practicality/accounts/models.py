from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    level = models.CharField(max_length=50, default='Susuki')

    def __str__(self):
        return self.username