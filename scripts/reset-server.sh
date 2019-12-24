#!/bin/bash

# Restart the Gunicorn process to pick up the changes to the django app
sudo systemctl restart gunicorn
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket

# If you change Gunicorn socket or service files, reload the daemon and restart the process 
sudo systemctl daemon-reload
sudo systemctl restart gunicorn.socket gunicorn.service

# Nginx server block configuration, test the configuration and then Nginx
sudo nginx -t && sudo systemctl restart nginx