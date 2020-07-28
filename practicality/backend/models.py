from django.db import models
from django.conf import settings
from django.utils.text import slugify


class Note(models.Model):
    """
    Model for storing note data. A note is where users write their daily practice
    notes. The body of the note must be a text field because the content is 
    generated using a WYSIWYG editor and must support long string lengths.

    Attributes:
        user (CustomUser): the user who created the note
        body (str): the content of the note
        date_created (datetime): the date the note was created
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        formatted_date = self.date_created.strftime('%m/%d/%y')
        return f'Note on {formatted_date}'


class Project(models.Model):
    """
    Model for storing project data. Projects have subtasks that belong to them
    and the user can crate steps for completing their project.
    The `save()` method automatically generates a title slug for urls.

    Attributes:
        user (CustomUser): the user who created the project
        title (str): the title of the project
        title_slug (str): used for the urls, generated automatically with `slugify()`
        description (str): the description of the project
        dateCreated (datetime): the time the note was created
        dateToComplete (datetime): the due date to complete the project by
        dateCompleted (datetime): the time all subtasks on the project are done
    """

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
        # Generate the title slug on save
        self.title_slug = slugify(self.title)
        super(Project, self).save(*args, **kwargs)


class Subtask(models.Model):
    """
    Subtasks belong to projects and are meant as incremental steps to achieve 
    the project.

    Attributes:
        project (Project): the project to which the subtask belongs
        name (str): the name of the subtask
        dateToComplete (datetime): the due date for the subtask
        completed (datetime): the time the subtask was completed
    """

    project = models.ForeignKey(Project, related_name='subtasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    dateToComplete = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name} on project {self.project.title}'


class Habit(models.Model):
    """
    Habits are daily tasks for every practice session.

    Attributes:
        user (CustomUser): the user who created the habit
        name (str): the name of the habit
        active (bool): whether or not the habit is active
        days_completed (int): the number of days the habit was completed
        date_created (datetime): the date the habit was created
        last_done (datetime): the last time the habit was done
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=False)
    days_completed = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    last_done = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'Habit {self.name}'
