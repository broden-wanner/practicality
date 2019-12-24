#!/bin/bash

# If you change Gunicorn socket or service files, reload the daemon and restart the process 
sudo systemctl daemon-reload
sudo systemctl restart gunicorn

# Nginx server block configuration, test the configuration and then Nginx
sudo nginx -t && sudo systemctl restart nginx
