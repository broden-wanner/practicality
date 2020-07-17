from django.shortcuts import render


def home(request):
    return render(request, 'www/index.html')
