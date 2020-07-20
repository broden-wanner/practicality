# ssh into the machine and execute the actual deploy script
ssh -o "StrictHostKeyChecking no" -t $HOST_USERNAME@$HOST_IP 'cd ~/practicality; git pull origin; source scripts/deploy.sh'