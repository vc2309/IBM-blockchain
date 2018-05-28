#!/bin/bash

osascript -e 'tell app "Terminal"
    do script "cd ~/IBM/IBM-blockchain/cryptonet-app/; nodemon app.js"
end tell'
composer-rest-server -c admin@cryptonet -w true -n always