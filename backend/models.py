from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        formatted_date = self.date_created.strftime('%d/%m/%y')
        return f'{self.title} on {formatted_date}'

class Project(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    title_slug = models.SlugField(unique=True)
    description = models.TextField()
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateToComplete = models.DateTimeField()
    dateCompleted = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        self.title_slug = slugify(self.title)
        super(Project, self).save(*args, **kwargs)

class Subtask(models.Model):
    project = models.ForeignKey(Project, related_name='subtasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    dateToComplete = models.DateTimeField()
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.name} on project {self.project.title}'

class Habit(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'Habit {self.name}'