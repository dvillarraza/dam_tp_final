#!/bin/bash
CONTAINER_NAME=mysql-server
NETWORK_NAME=$1
DATABASE_DIR=$2

echo "{container:$CONTAINER_NAME, net:$NETWORK_NAME, db:$DATABASE_DIR}"

docker run \
--rm \
--detach \
--name $CONTAINER_NAME \
--network $NETWORK_NAME \
--env MYSQL_ROOT_PASSWORD=userpass \
--volume $DATABASE_DIR:/var/lib/mysql \
mysql:5.7