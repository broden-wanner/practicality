#!/bin/bash

# Reload the daemon and restart the process 
sudo systemctl restart gunicorn-practicality
sudo systemctl daemon-reload
sudo systemctl restart gunicorn-practicality.socket gunicorn-practicality.service

# Nginx server block configuration, test the configuration and then Nginx
sudo nginx -t && sudo systemctl restart nginx
