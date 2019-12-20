from django.contrib import admin
from backend.models import Note, Project, Subtask

admin.site.register(Note)
admin.site.register(Project)
admin.site.register(Subtask)