from rest_framework import serializers
from django.contrib.auth.models import User
from .models import interview, applicant
 
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = interview
        fields = '__all__'


class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = applicant
        fields = '__all__'