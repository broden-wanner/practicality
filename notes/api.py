import datetime
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from notes.models import Note, Project, Subtask
from notes.serializers import NoteSerializer, ProjectSerializer, SubtaskSerializer
from accounts.models import CustomUser

class NoteViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing notes.
    """
    serializer_class = NoteSerializer
    # Users must be authenticated to view their notes
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Override the get_queryset method to return only those
        notes which belong to the user
        """
        return Note.objects.filter(user=self.request.user)

    def list(self, request):
        """
        Override the list method to create a new note
        if there has not been one created for this day
        """
        queryset = Note.objects.filter(user=self.request.user)
        serializer = NoteSerializer(queryset, many=True)

        latest_note = queryset.latest('date_created')
        if latest_note.date_created.date() < datetime.date.today() and isinstance(request.user, CustomUser):
            Note.objects.create(user=request.user, body='', title='For today')
        return Response(serializer.data)

class ProjectViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing projects
    """
    serializer_class = ProjectSerializer
    # Users must be authenticated to view their projects
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Override the get_queryset method to return only those
        projects which belong to the user
        """
        return Project.objects.filter(user=self.request.user)

class SubtaskViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing subtasks on projects
    """
    serializer_class = SubtaskSerializer
    # Users must be authenticated to view subtasks
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Override the get_queryset method to return only those
        projects which belong to the user
        """
        return Subtask.objects.filter(project__user=self.request.user)