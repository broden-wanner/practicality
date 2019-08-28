#!/usr/bin/bash

# Build frontend
( cd frontend/app && npm run build-prod )

# Collect static files
python manage.py collectstatic

# Run migrations
python manage.py makemigrations
python manage.py migrate