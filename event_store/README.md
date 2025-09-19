Option 1: Modify Your Existing Container (Recommended)
Step 1: Stop the Current Container
bashsudo docker stop 477e4d845956
Step 2: Start the Container with Replica Set Command
bashsudo docker run -d \
  --name mongodb-replica \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:6.0 \
  mongod --replSet rs0 --bind_ip_all
Step 3: Initialize the Replica Set
bashsudo docker exec -it mongodb-replica mongosh --eval "
rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'localhost:27017' }
  ]
})
"
Step 4: Verify Replica Set Status
bashsudo docker exec -it mongodb-replica mongosh --eval "rs.status()"

//another way 
services:
  mongodb:
    image: mongo:6.0
    container_name: event_store-mongodb-1
    command: mongod --replSet rs0 --bind_ip_all
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db 

sudo docker-compose down
sudo docker-compose up -d