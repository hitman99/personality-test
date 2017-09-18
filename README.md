# Personality Test Code Challenge

## How to run the app
This app can run in two ways:
1.  Your local environment
2.  Docker

Both ways are explained below. If App started correctly, you should see this view:

![Initial View](/screenshots/initial_view.png?raw=true)

### Running on local environment
Follow the steps below to run this app on your local environment

1.  Install and start __Redis__ 3.x on default port
2.  Install latest Node
3.  `git pull` this repository
4.  `npm install`
5.  `npm run build`
6.  `npm start`

The app is now available via browser on default HTTP port on all the IPs your environment has.

If the last step fails, change the port in [`server.cfg.json`](/server.cfg.json) file as it listens on all IPs and on the
default `80` (HTTP) port. 

### Running in Docker

Follow the steps below to run this app in Docker. You need to use `sudo` or be `root` to be able to execute docker commands

1.  Install Docker and docker-compose
2.  `git pull` this repository
3.  `docker-compose up`

The app is now available via browser on default HTTP port on all the IPs your environment has.
If you like, change the port mapping in last docker commant to your liking. Example, to start the app on 8080 port,
execute this command: `docker run personality-test -p 8080:80`

## How to run test
Top run the automated tests, follow the steps below

1.  Install latest Node
2.  `git pull` this repository
3.  `npm install`
4.  `npm test`

