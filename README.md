# IBM-blockchain

This repo follows a cryptocurrency project which I worked on with IBM Hong Kong

## Setup Instructions and Explanation

### Step 1:
Install prerequisites locally
Found at : https://hyperledger.github.io/composer/installing/installing-prereqs.html
Summary (MacOS) : nvm + Docker + Node

### Step 2:
Install Dev environment:
Found at : https://hyperledger.github.io/composer/installing/development-tools.html
Summary :

- Install the Components:
	- CLI tools : composer-cli + composer-rest-server (REST api for business network to be used as app) + generator-hyperledger-composer (generates the application assets) 
+ Yoeman (uses the generator to generate the application assets)

	- Install the playground : composer-playground (UI for viewing network)

	- Install Hyperledger Fabric : Install local runtime of HF to deploy networks on

- Controlling the environment:
	- Starting the HF : startFabric.sh (need to generate PeerAdmin card first)
	- Stopping : stopFabric.sh
	- Start the web app ("Playground") : composer-playground


## Building A Solution

### Step 1: Creating a Network Structure
	- BND (Business Network Definition) : Data model, transaction logic and access control rules
	- Can use Yoeman

### Step 2: Define the Network
	- Design the .cto file (all components of Network)
	- Design the logic.js
	- permissions.acl

### Step 3: Generate .bna file

### Step 4: Deploy .bna onto an instance of HF

### Step 5: Generate the REST server