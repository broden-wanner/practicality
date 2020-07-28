from rest_framework import serializers
from .models import *


class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Note model. Subclasses DRF's `ModelSerializer`.
    """

    class Meta:
        model = Note
        fields = '__all__'


class SubtaskSerializer(serializers.ModelSerializer):
    """
    Serializers for subtasks. Adds the project to which it belongs as 
    a primary key. Subclasses DRF's `ModelSerializer`.
    """

    project = serializers.PrimaryKeyRelatedField(required=False, queryset=Project.objects.all(), allow_null=True)

    class Meta:
        model = Subtask
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializers for projects. Adds the subtasks on the project as a nested
    serializer. Includes methods for creating and updating the subtasks
    on the project.
    """

    subtasks = SubtaskSerializer(many=True, read_only=False)

    class Meta:
        model = Project
        fields = ['id', 'user', 'title', 'description', 'dateCreated', 'dateToComplete', 'dateCompleted', 'subtasks']
        read_only_fields = ['id', 'user', 'dateCreated', 'dateCompleted']

    def create(self, validated_data):
        """
        Override the create method to add the subtasks to the database

        Args:
            validated_data (dict): the data validated by the serializer

        Returns:
            Project: the created project
        """
        subtask_data = validated_data.pop('subtasks')
        project = Project.objects.create(**validated_data, user=self.context['request'].user)
        for subtask in subtask_data:
            # Remove the null project field from the subtask data
            del subtask['project']
            Subtask.objects.create(project=project, **subtask)
        return project

    def update(self, instance, validated_data):
        """
        Overrides the update method to update the subtasks on the project
        as well

        Args:
            instance (Project): the project instance to update
            validated_data (dict): the new data validated by the serializer

        Returns:
            Project: the updated project
        """
        subtask_data = validated_data.pop('subtasks')
        Project.objects.filter(pk=instance.pk).update(**validated_data, user=self.context['request'].user)
        project = Project.objects.get(pk=instance.pk)
        for subtask in subtask_data:
            subtask.pop('project')
            try:
                subtask_obj = Subtask.objects.get(project=project, name=subtask['name'])
                Subtask.objects.filter(pk=subtask_obj.pk).update(**subtask)
            except Subtask.DoesNotExist:
                Subtask.objects.create(project=project, **subtask)
        return project


class HabitSerializer(serializers.ModelSerializer):
    """
    Serializer for habits. Subclasses DRF's `ModelSerializer`. Adds the
    user from the context to the habit.
    """

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    last_done = serializers.DateTimeField(allow_null=True, required=False)

    class Meta:
        model = Habit
        fields = '__all__'

    def create(self, validated_data):
        """
        Override the create method to add the user
        """
        habit = Habit.objects.create(user=self.context['request'].user, **validated_data)
        return habit
