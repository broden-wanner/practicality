from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """
    Subclasses the Django `AbstractUser` class in order to add additional
    information.

    Attributes:
        level (str): the level of the user (to be used later on)
    """
    level = models.CharField(max_length=50, default='Susuki')

    def __str__(self):
        return self.username
