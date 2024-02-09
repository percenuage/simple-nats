# simple-nats

The purpose is show an example of microservice architecture in Node.js and Nats (message queue)

# Getting started

```shell script
$ docker-compose up --build # It will run "nats" and 3 node apps (main, social and notification)
$ node call.js # Start the process and check logs from docker-compose of all node apps
```

# Use case

1/ [MAIN] User login --> [NOTIFICATION] Write in DB
2/ [MAIN] User publish a post --> [SOCIAL] A post is published to FB and Twitter
3/ [MAIN] A post is published --> [NOTIFICATION] Notify all users
