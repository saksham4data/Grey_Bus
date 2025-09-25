from django.db import models
from django.contrib.auth.models import User


class Bus(models.Model):
    bus_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    route_start = models.CharField(max_length=100)
    route_end = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name} ({self.bus_number})"


class Stop(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="stops")
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField()  # stop sequence in route
    arrival_time = models.TimeField()
    departure_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.bus.bus_number}"


class Schedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="schedules")
    date = models.DateField()
    departure_time = models.TimeField(null=True, blank=True)
    arrival_time = models.TimeField()

    def __str__(self):
        return f"{self.bus.name} on {self.date}"


class PassengerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    addr1 = models.CharField(max_length=255, blank=True)
    addr2 = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=20, blank=True)
    state = models.CharField(max_length=100, blank=True)
    area = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    region = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username


class BusLocation(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name="locations")
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.bus.bus_number} @ {self.last_updated}"


