from rest_framework import serializers
from notes.models import Note, Project, Subtask

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
        fields = ['user', 'title', 'description', 'date_created', 'subtasks']

    def create(self, validated_data):
        subtask_data = validated_data.pop('subtasks')
        project = Project.objects.create(**validated_data)
        for subtask in subtask_data:
            Subtask.objects.create(project=project, **subtask)
        return project

    # def update(self, instance, validated_data):
    #     subtask_data = validated_data.pop('subtasks')
    #     for subtask in instance.subtasks:
    #         s = subtask_data.get(id=subtask.id)
    #         s.update(s, )
    #     return project
