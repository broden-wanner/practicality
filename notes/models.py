from django.db import models
from django.conf import settings

class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(blank=True)
    title = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        formatted_date = self.date_created.strftime('%d/%m/%y')
        return f'{self.title} on {formatted_date}'

class Project(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    title_slug = models.SlugField(unique=True)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Project {self.title}'

class Subtask(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    
    def __str__(self):
        return f'Subtask {self.title} on project {project.title}'

class Habit(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'Habit {self.name}'