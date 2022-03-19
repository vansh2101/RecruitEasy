from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import interview, applicant
from .serializers import UserSerializer, InterviewSerializer, ApplicantSerializer

# Create your views here.

class UserList(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = UserSerializer(data=request.data)

        if data.is_valid():
            password = data.validated_data.get('password')
            data.validated_data['password']=make_password(password)
            user = data.save()

            if user:
                return Response(data.data)

        return Response(data.errors)



class InterviewList(generics.ListCreateAPIView):
    queryset = interview.objects.all()
    serializer_class = InterviewSerializer

    def get_queryset(self):
        user = self.request.user
        return interview.objects.filter(host=user)



class InterviewDetailList(generics.RetrieveUpdateAPIView):
    queryset = interview.objects.all()
    serializer_class = InterviewSerializer



class ApplicantList(generics.ListCreateAPIView):
    queryset = applicant.objects.all()
    serializer_class = ApplicantSerializer

    def get_queryset(self):
        interview = self.request.data['interview']
        return applicant.objects.filter(interview=interview)