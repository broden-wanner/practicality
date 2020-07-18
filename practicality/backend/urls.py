from django.urls import path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, basename='notes')
router.register('projects', ProjectViewSet, basename='projects')
router.register('habits', HabitViewSet, basename='habits')

urlpatterns = router.urls + [
    path('subtasks/', SubtaskViewSet.as_view({'post': 'create'})),
    path('subtasks/<int:pk>/', SubtaskViewSet.as_view({'put': 'update',
                                                       'patch': 'partial_update',
                                                       'delete': 'destroy'}))
]
