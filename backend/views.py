import datetime
from django.utils import timezone
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from backend.models import Note, Project, Subtask, LibraryUpload
from backend.serializers import NoteSerializer, ProjectSerializer, SubtaskSerializer, LibraryUploadSerializer
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
        try:
            latest_note = queryset.latest('date_created')
            if latest_note.date_created.date() < datetime.date.today() and isinstance(request.user, CustomUser):
                new_note = Note.objects.create(user=request.user, body='')
                # Redo the query to include the new note
                queryset = Note.objects.filter(user=self.request.user)
        except Note.DoesNotExist:
            first_note = Note.objects.create(user=request.user, body='')
            queryset = [first_note]
            
        serializer = NoteSerializer(queryset, many=True)
        
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
        subtasks which belong to the user
        """
        return Subtask.objects.filter(project__user=self.request.user)

class LibraryUploadViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing library uploads
    """
    serializer_class = LibraryUploadSerializer
    # Users must be authenticated to view library uploads
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [FormParser, MultiPartParser]

    def get_queryset(self):
        """
        Override the get_queryset method to return only those
        library uploads which belong to the user
        """
        return LibraryUpload.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        """
        Add the request context for the serializer to use
        """
        return {'request': self.request}
