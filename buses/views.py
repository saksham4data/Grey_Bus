from django.shortcuts import render
from .models import Bus, Stop, Schedule, PassengerProfile, BusLocation
# Create your views here.
def search_bus(request):
    buses=None
    source = request.Get.get('source')
    destination = request.Get.get('destination')

    if source and destination:
        buses = Bus.objects.filter(
            stops__name__iexact=source
        ).filter(
            stops__name__iexact=destination
        ).distinct()
        
    context = {
        'buses': buses,
        'source': source,
        'destination': destination
    }

    return render(request, 'buses/search_results.html', context)
def home(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')
def my_trackings(request):
    return render(request, 'my_trackings.html')
def header(request):
    return render(request, 'header.html')
def login(request):
    return render(request, 'login.html')
def user_settings(request):
    return render(request, 'user_settings.html')
def bus_results(request):
    return render(request, 'bus_results.html')
def bus_tracker(request):
    return render(request, 'bus_tracker.html')