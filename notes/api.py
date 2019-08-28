from rest_framework import viewsets
from rest_framework import permissions
from notes.models import Note
from notes.serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing notes.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.AllowAny]