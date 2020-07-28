from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.serializers import DateTimeField
from knox.models import AuthToken
from knox.settings import knox_settings
from accounts.serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer
from accounts.models import CustomUser


class UserAPI(generics.RetrieveAPIView):
    """
    View class for getting the current user's information. Subclasses DRF's
    `RetrieveAPIView` and provides only a get method. Users must be authenticated.
    """

    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Provides the user object for the retrieve api
        """
        return self.request.user


class RegisterAPI(generics.GenericAPIView):
    """
    View class for registering a user. Subclasses DRF's `GenericAPIView` and
    provides a post method to create the user
    """

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        """
        Method for registering a user with the given data. Uses the 
        RegisterSerializer to create the user and also creates a 
        token with the Django REST Knox library. Includes the expiry date
        for the frontend to use.
        """

        # Create the user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create a token for teh user
        instance, token = AuthToken.objects.create(user)

        return Response({
            'user': CustomUserSerializer(user, context=self.get_serializer_context()).data,
            'token': token,
            'expiry_date': instance.expiry
        })


class LoginAPI(generics.GenericAPIView):
    """
    View class for logging a user in. Subcalsses DRF's `GenericAPIView` class. 
    Relies on the LoginSerializer to authenticate.
    """

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        """
        Method for logging the user in.  Returns the logged in user,
        their newly-created token, and its expiry date.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        instance, token = AuthToken.objects.create(user)
        return Response({
            'user': CustomUserSerializer(user, context=self.get_serializer_context()).data,
            'token': token,
            'expiry_date': instance.expiry
        })
