# Blockchain Overview
- Understanding each of the main components required to make and deploy a Blockchain Network.

## Business Network Definition
- Key concept of the HC programming model
- Represented by BusinessNetworkDefinition class, defined in the composer-common module

Business Network Defintion is packaged into a .bna file. this is Business Network Archive, made up from:

- .cto file (Model File)
	- Created by Business Analysts
	- Defines structure and relationships between model elements
	- Business domain

- .js file (Script files)
	- Created by developers implementing the business requirements
	- Transaction logic

- .acl file (Access control)
	- Who can access what within the network

Once all these are defined, the .bna file can be generated using the composer command line. This archive can now be deployed/undeployed/updated on the fabric using AdminConnection class from composer-admin module.


## Creating a BND
- The simplest way is to use the Yoeman comand line tool to create a skeleton bnd

- lib/
- models/
- permissions.acl
- package.json [  contains all the metadate for bnd]
- README.md

## Deploying a Business Network

- `composer archive create` : command to make a .bna file from the bnd on disk
- `composer runtime install -n my-network -c PeerAdmin@fabric-network` 
**It is important to review the usage and structure of the Modelling Language prior to moving to the next portion**

## Events in a Network

- these events can be emitted by HC and subscribed to by external apps. 
- Events are defined in the .cto file
- `event BasicEvent{...}`
- Emmitted by the .js scripts of a BND
- 3 STEP process
	1. `var factory=getFactory();` : this allows events to be created as part the transaction
	2. `var EventName=factory.newEvent('org.namespace','EventName');` : creates the event "object" so to speak. The properties of this event require setting.
	3. `emit(EventName);`