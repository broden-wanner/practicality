#!/usr/bin/bash

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Build frontend
( cd frontend/app && ionic build --prod )

# Collect static files
python manage.py collectstatic --noinput
