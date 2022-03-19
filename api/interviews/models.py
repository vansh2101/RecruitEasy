from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.


class interview(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    from_time = models.TimeField()
    to_time = models.TimeField()
    applicants = models.IntegerField(default=0)
    questions = models.JSONField()

    def __str__(self):
        return self.title + "-" + self.host.username


class applicant(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField()
    interview = models.ForeignKey(interview, on_delete=models.CASCADE)
    desc = models.TextField()
    video = models.JSONField()

    def __str__(self) -> str:
        return self.name + '-' + self.interview.title