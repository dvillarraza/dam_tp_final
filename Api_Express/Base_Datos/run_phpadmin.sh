
#!/bin/bash
CONTAINER_NAME=phpadmin
NETWORK_NAME=$1
MYSQL_HOST=$2
PORT=$3

echo "{$CONTAINER_NAME, net:$NETWORK_NAME, mysql:$MYSQL_HOST, p:$PORT}"

docker run \
--rm \
--detach \
--name $CONTAINER_NAME \
--network $NETWORK_NAME \
--env PMA_HOST=$MYSQL_HOST \
--publish $PORT:80 \
phpmyadmin/phpmyadmin