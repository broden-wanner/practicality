from rest_framework import serializers
from django.contrib.auth import authenticate
from accounts.models import CustomUser
from backend.models import Note


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializer for the custom user model. Subclasses the DRF `ModelSerializer`
    class. Adds the notes created by the user for serialization.
    """

    notes_created = serializers.SerializerMethodField(method_name='get_notes_created')

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'level',
            'notes_created'
        )

    def get_notes_created(self, obj):
        """
        Gets teh number of notes created by the user

        Args:
            obj (CustomUser): the custom user instance

        Returns:
            int: the number of notes created by the user
        """
        return Note.objects.filter(user=obj).count()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer used to register a user. Subclasses DRF's `ModelSerializer` and uses
    the `CustomUser` model. The password field is write-only.
    """

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        """
        Overrides the create method to use the `created_user` method on the Django
        objects API

        Args:
            validated_data (dict): the data validated by the serializer

        Returns:
            CustomUser: the created custom user instance
        """

        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer used for logging users in. Subclasses DRF's `Serializer` class.
    It authenticates users by calling Django's `authenticate()` function.
    """

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """
        Override the validate method to authenticate the user.

        Args:
            data (dict): the given login data

        Returns:
            CustomUser: the user object associated with the credentials
            if login is successful

        Raises:
            ValidationError: if the credentials are incorrect
        """
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError('Incorrect Credentials')
