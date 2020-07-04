from django.contrib import admin
from backend.models import Note, Project, Subtask

class NoteAdmin(admin.ModelAdmin):
    readonly_fields = ('date_created',)

admin.site.register(Note, NoteAdmin)
admin.site.register(Project)
admin.site.register(Subtask)