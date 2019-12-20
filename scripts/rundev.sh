#!/usr/bin/bash

# Activate the virtual environment
source ./venv/scripts/activate

# Start the django server along with the ionic server
python manage.py runserver &
cd frontend/app && ionic serve