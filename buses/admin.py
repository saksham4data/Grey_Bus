from django.contrib import admin

# Register your models here.
from .models import Bus, Stop, Schedule, PassengerProfile, BusLocation

admin.site.register(Bus)
admin.site.register(Stop)
admin.site.register(Schedule)
admin.site.register(PassengerProfile)
admin.site.register(BusLocation)