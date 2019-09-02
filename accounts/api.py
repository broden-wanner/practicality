from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.serializers import DateTimeField
from knox.models import AuthToken
from knox.settings import knox_settings
from accounts.serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer
from accounts.models import CustomUser

class UserAPI(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        instance, token = AuthToken.objects.create(user)
        return Response({
            'user': CustomUserSerializer(user, context=self.get_serializer_context()).data,
            'token': token,
            'expiry_date': instance.expiry
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        instance, token = AuthToken.objects.create(user)
        return Response({
            'user': CustomUserSerializer(user, context=self.get_serializer_context()).data,
            'token': token,
            'expiry_date': instance.expiry
        })