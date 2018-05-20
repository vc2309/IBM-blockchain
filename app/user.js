const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
//Connect with the network
const IdCard = require('composer-common').IdCard;	//Handles the uploaded file
const FileSystemCardStore = require('composer-common').FileSystemCardStore;	//Card store
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const AdminConnection = require('composer-admin').AdminConnection; //responsible for handling card imports, exports, issue and revoke identities and other admin related actions

var fileSystemCardStore = new FileSystemCardStore();
var businessNetworkCardStore = new BusinessNetworkCardStore();
var adminConnection = new AdminConnection();

class User {

  constructor(cardName) {
    this.currentParticipantId;
    this.cardName = cardName;
    this.connection = new BusinessNetworkConnection();
  }

  static importCardToNetwork(cardData) {
  var _idCardData, _idCardName;
  var businessNetworkConnection = new BusinessNetworkConnection();

  return IdCard.fromArchive(cardData).then(function(idCardData) {
    _idCardData = idCardData;
    return BusinessNetworkCardStore.getDefaultCardName(idCardData)
  }).then(function(idCardName) {
    _idCardName = idCardName;
    return fileSystemCardStore.put(_idCardName, _idCardData)
  }).then(function(result) {
    return adminConnection.importCard(_idCardName, _idCardData);
  }).then(function(imported) {
    if (imported) {
      return businessNetworkConnection.connect(_idCardName)
    } else {
      return null;
    }
  }).then(function(businessNetworkDefinition){
    if (!businessNetworkDefinition) {
      return null
    }
    return _idCardName;
  })
}
}


 

module.exports = {
	User
}