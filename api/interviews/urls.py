from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserList.as_view()),
    path('user/', views.UserData.as_view()),
    path('interview/', views.InterviewList.as_view()),
    path('interview/<str:pk>', views.InterviewDetailList.as_view()),
    path('applicant/', views.ApplicantList.as_view()),
    path('applicant/<int:pk>', views.ApplicantDetails.as_view()),
]
