#!/usr/bin/bash

cd ~/practicality

# Pull the new source code
git pull origin master

# Activate virtual environment
source venv/scripts/activate

# Ensure all dependencies are installed
pip install -r requirements.txt

# Run migrations
cd ./practicality
python manage.py makemigrations
python manage.py migrate

# Build frontend
cd frontend/app && ionic build --prod

# Collect static files
python manage.py collectstatic --noinput

# Restart the server
source ../scripts/restart-server.sh