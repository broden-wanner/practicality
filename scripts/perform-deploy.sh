# ssh into the machine and execute the actual deploy script
ssh -t $HOST_USERNAME@$HOST_IP 'cd ~/practicality; git pull origin; source scripts/deploy.sh'