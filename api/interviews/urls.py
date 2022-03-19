from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserList.as_view()),
    path('interview/', views.InterviewList.as_view()),
    path('interview/<int:pk>', views.InterviewDetailList.as_view()),
    path('applicant/', views.ApplicantList.as_view()),
]
