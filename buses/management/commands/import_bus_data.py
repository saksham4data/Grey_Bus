import csv
import os
from datetime import datetime
from django.core.management.base import BaseCommand
from buses.models import Bus, Stop, Schedule, BusLocation  # Replace 'bus_app' with your app name

class Command(BaseCommand):
    help = 'Import bus data from CSV files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--csv-path',
            type=str,
            default='data/',
            help='Path to directory containing CSV files',
        )

    def handle(self, *args, **options):
        csv_path = options['csv_path']

        # Import data in order: Bus -> Stop -> Schedule -> BusLocation
        self.import_buses(csv_path)
        self.import_stops(csv_path)
        self.import_schedules(csv_path)
        self.import_bus_locations(csv_path)

        self.stdout.write(self.style.SUCCESS('Successfully imported all bus data!'))

    def import_buses(self, csv_path):
        file_path = os.path.join(csv_path, 'buses.csv')

        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            buses_created = 0

            for row in reader:
                bus, created = Bus.objects.get_or_create(
                    bus_number=row['bus_number'],
                    defaults={
                        'name': row['name'],
                        'route_start': row['route_start'],
                        'route_end': row['route_end'],
                    }
                )
                if created:
                    buses_created += 1

        self.stdout.write(f'Imported {buses_created} buses')

    def import_stops(self, csv_path):
        file_path = os.path.join(csv_path, 'stops.csv')

        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            stops_created = 0

            for row in reader:
                try:
                    bus = Bus.objects.get(id=row['bus_id'])

                    departure_time = None
                    if row['departure_time'] and row['departure_time'].strip():
                        departure_time = datetime.strptime(row['departure_time'], '%H:%M:%S').time()

                    existing_stops = Stop.objects.filter(bus=bus, name=row['name'], order=row['order'])
                    if existing_stops.exists():
                        stop = existing_stops.first()
                        stop.name = row['name']
                        stop.arriavl_time = datetime.strptime(row['arrival_time'], '%H:%M:%S').time()
                        stop.departure_time = departure_time
                        stop.save()
                    else:
                        stop = Stop.objects.create(
                        bus=bus,
                        order=int(row['order']),
                        name=row['name'],
                        arrival_time=datetime.strptime(row['arrival_time'], '%H:%M:%S').time(),
                        departure_time=departure_time,
                        )
                        created = True
                    if created:
                        stops_created += 1

                except Bus.DoesNotExist:
                    self.stdout.write(self.style.WARNING(f'Bus with ID {row["bus_id"]} not found for stop {row["name"]}'))

        self.stdout.write(f'Imported {stops_created} stops')

    def import_schedules(self, csv_path):
        file_path = os.path.join(csv_path, 'schedules.csv')

        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            schedules_created = 0

            for row in reader:
                try:
                    bus = Bus.objects.get(id=row['bus_id'])

                    departure_time = None
                    if row['departure_time'] and row['departure_time'].strip():
                        departure_time = datetime.strptime(row['departure_time'], '%H:%M:%S').time()

                    schedule, created = Schedule.objects.get_or_create(
                        bus=bus,
                        date=datetime.strptime(row['date'], '%Y-%m-%d').date(),
                        defaults={
                            'departure_time': departure_time,
                            'arrival_time': datetime.strptime(row['arrival_time'], '%H:%M:%S').time(),
                        }
                    )
                    if created:
                        schedules_created += 1

                except Bus.DoesNotExist:
                    self.stdout.write(self.style.WARNING(f'Bus with ID {row["bus_id"]} not found for schedule on {row["date"]}'))

        self.stdout.write(f'Imported {schedules_created} schedules')

    def import_bus_locations(self, csv_path):
        file_path = os.path.join(csv_path, 'bus_locations.csv')

        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            locations_created = 0

            for row in reader:
                try:
                    bus = Bus.objects.get(id=row['bus_id'])

                    location, created = BusLocation.objects.update_or_create(
                        bus=bus,
                        defaults={
                            'latitude': float(row['latitude']),
                            'longitude': float(row['longitude']),
                            'last_updated': datetime.fromisoformat(row['last_updated'].replace('Z', '+00:00')),
                        }
                    )
                    if created:
                        locations_created += 1

                except Bus.DoesNotExist:
                    self.stdout.write(self.style.WARNING(f'Bus with ID {row["bus_id"]} not found for location'))

        self.stdout.write(f'Imported {locations_created} bus locations')
