import datetime
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from notes.models import Note
from notes.serializers import NoteSerializer
from accounts.models import CustomUser

class NoteViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing notes.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.AllowAny]


    def list(self, request):
        """
        Override the list method to create a new note
        if there has not been one created for this day
        """
        queryset = Note.objects.all()
        serializer = NoteSerializer(queryset, many=True)

        latest_note = queryset.latest('date_created')
        if latest_note.date_created.date() < datetime.date.today() and isinstance(request.user, CustomUser):
            Note.objects.create(user=request.user, body='', title='For today')
        return Response(serializer.data)