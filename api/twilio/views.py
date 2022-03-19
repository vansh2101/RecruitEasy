from rest_framework.decorators import api_view
from rest_framework.response import Response
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import *


import environ
env = environ.Env()

# Create your views here.

@api_view(['POST'])
def send_email(request):
    data = request.data

    message = Mail(
        from_email = 'sample.mail.2101@gmail.com',
        to_emails = data['email'],
        subject = data['subject'],
        html_content = data['msg']
    )

    try:
        sg = SendGridAPIClient(env('SENDGRID_API_KEY'))
        sg.send(message)

        return Response({'msg': 'mail sent'})

    except:
        return Response({'msg': 'error'})