#!/usr/bin/bash

# Activate virtual environment
source ./venv/scripts/activate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Build frontend
( cd frontend/app && ionic build --prod )

# Collect static files
python manage.py collectstatic --noinput
