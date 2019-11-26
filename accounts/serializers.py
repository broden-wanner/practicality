from rest_framework import serializers
from django.contrib.auth import authenticate
from accounts.models import CustomUser
from notes.models import Note

class CustomUserSerializer(serializers.ModelSerializer):
    notes_created = serializers.SerializerMethodField(method_name='get_notes_created')

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'level', 'notes_created')

    def get_notes_created(self, obj):
        return Note.objects.filter(user=obj).count()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'notes_created')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError('Incorrect Credentials')