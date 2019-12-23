from rest_framework import serializers
from backend.models import Note, Project, Subtask

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = '__all__'
        read_only_fields = ('project',) # Must be read only because the project will create it

class ProjectSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, read_only=False)

    class Meta:
        model = Project
        fields = ['id', 'user', 'title', 'description', 'dateCreated', 'dateToComplete', 'dateCompleted', 'subtasks']
        read_only_fields = ['id', 'user', 'dateCreated', 'dateCompleted']

    def create(self, validated_data):
        subtask_data = validated_data.pop('subtasks')
        project = Project.objects.create(**validated_data, user=self.context['request'].user)
        for subtask in subtask_data:
            Subtask.objects.create(project=project, **subtask)
        return project

    # TODO: Add update method
    # def update(self, instance, validated_data):
    #     subtask_data = validated_data.pop('subtasks')
    #     for subtask in instance.subtasks:
    #         s = subtask_data.get(id=subtask.id)
    #         s.update(s, )
    #     return project
