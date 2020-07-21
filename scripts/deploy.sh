#!/usr/bin/bash

cd ~/practicality

# Pull the new source code
git pull origin master
echo -e "Pulled source code\n\n"

# Activate virtual environment
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate
echo -e "Activated the virtual environment\n\n"

# Ensure all dependencies are installed
pip3 install --upgrade pip
pip3 install -r requirements.txt
echo -e "Installed dependencies\n\n"

# Run migrations
cd ./practicality
python3 manage.py makemigrations
python3 manage.py migrate
echo -e "Ran migrations\n\n"

# Build frontend
cd frontend/ionic-app 
npm install -g @ionic/cli
npm install
ionic build --prod
cd ../..
echo -e "Built frontend\n\n"

# Collect static files
python3 manage.py collectstatic --noinput
echo -e "Collected static files\n\n"

# Restart the server
source ../scripts/restart-server.sh
echo "Server restarted"