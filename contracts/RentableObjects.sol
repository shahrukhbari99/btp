pragma solidity ^0.5.0;

contract RentableObjects {

  struct Client {
    address cliAddress;
    uint since;
    bool exists;
  }
  struct Object {
    uint objId;
    string description;
    uint deposit;
    uint pricePerDay;
    Client client;
    uint created;
    address owner;
    bool exists;
  }
  mapping (uint => Object) objects;
  address owner;
  
  constructor () public {
    owner = msg.sender;
  }
  
  function registerObject(uint _objId, uint _deposit, uint _pricePerDay, string memory _descr) public returns (bool) {
    if ( !(objectIsRegistered(_objId)) ) {
      Client memory nilClient = Client({cliAddress: address(0x0), since: now, exists: false});
      objects[_objId] = Object({objId: _objId, description: _descr, deposit: _deposit, pricePerDay: _pricePerDay, client: nilClient, created: now, owner: msg.sender, exists: true});
      return true;
    }
    revert();
  }
  
  function unregisterObject(uint _objId) public returns (bool) {
    if ( objectIsRegistered(_objId) && !(objectIsRented(_objId)) ) {
      delete objects[_objId];
      return true;
    }
    revert();
  }
  function rentObject(uint _objId) public payable returns (bool) {
    if ( !(objectIsRegistered(_objId)) || objectIsRented(_objId) || msg.value < objects[_objId].deposit) {
      revert();
    }
    // add client to object
    objects[_objId].client = Client({cliAddress: msg.sender, since: now, exists: true});
    
    //if ( !objects[_objId].client.cliAddress.send(msg.value - objects[_objId].deposit) ) {
    //  revert();
    //}
    return true;
  }

  
  function reclaimObject(uint _objId) public returns (bool) {
    assert ( objectIsRented(_objId) && objects[_objId].owner == msg.sender );

   //uint returnDeposit = getReturnDeposit(_objId);
    //if ( !objects[_objId].owner.send(objects[_objId].deposit - returnDeposit) ) {
      //revert();
    //}
    //if ( !objects[_objId].client.cliAddress.send(returnDeposit) ) {
      //revert();
    //}
    objects[_objId].client = Client({cliAddress: address(0x0), since: now, exists: false});
    return true;
  }

function objectIsRegistered(uint _objId) public view returns (bool) {
    return objects[_objId].exists;
  }

function objectIsRented(uint _objId) public view returns (bool) {
    return objects[_objId].exists && objects[_objId].client.exists;
  }

function getReturnDeposit(uint _objId) public view returns (uint) {
    uint day = 86400;
    uint clientTime = getObjectClientTime(_objId);
    uint daysRented = ( (clientTime - 1) / day ) + 1;
    uint rentalCost = daysRented * objects[_objId].pricePerDay;
    uint returnDeposit = objects[_objId].deposit - rentalCost;
    return returnDeposit;
  }
  function getObjectDeposit(uint _objId) public view returns (uint) {
    return objects[_objId].deposit;
  }
  
  function getObjectPricePerDay(uint _objId) public view returns (uint) {
    return objects[_objId].pricePerDay;
  }
  
  function getObjectDescription(uint _objId) public view returns (string memory) {
    return objects[_objId].description;
  }
  
  function getObjectClientExists(uint _objId) public view returns (bool) {
    return objects[_objId].client.exists;
  }
  function getObjectClientTime(uint _objId) public view returns (uint) {
    return now - objects[_objId].client.since;
  }
  
  function getObjectClientAddress(uint _objId) public view returns (address) {
    return objects[_objId].client.cliAddress;
  }

function getObjectOwnerAddress(uint _objId) public view returns (address) {
    return objects[_objId].owner;
  }
  function getContractOwnerAddress() public view returns (address) {
    return owner;
  }
//   function () public {
//     revert();
//   }
  
}
