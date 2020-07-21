#!/usr/bin/bash

cd ~/practicality

# Pull the new source code
git pull origin master
echo "Pulled source code"

# Activate virtual environment
source venv/scripts/activate
echo "Activated the virtual environment"

# Ensure all dependencies are installed
pip3 install -r requirements.txt
echo "Installed dependencies"

# Run migrations
cd ./practicality
python3 manage.py makemigrations
python3 manage.py migrate
echo "Ran migrations"

# Build frontend
cd frontend/app && ionic build --prod
echo "Built frontend"

# Collect static files
python manage.py collectstatic --noinput
echo "Collected static files"

# Restart the server
source ../scripts/restart-server.sh
echo "Server restarted"