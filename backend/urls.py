from django.urls import path
from rest_framework import routers
from backend.views import NoteViewSet, ProjectViewSet, SubtaskViewSet, LibraryUploadViewSet

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')
router.register('projects', ProjectViewSet, 'projects')
router.register('library-uploads', LibraryUploadViewSet, 'library-uploads')

urlpatterns = router.urls
urlpatterns += [
    path('subtasks/', SubtaskViewSet.as_view({'post': 'create'})),
    path('subtasks/<int:pk>/', SubtaskViewSet.as_view({'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}))
]