// var RentableObjects = artifacts.require("./RentableObjects.sol");

// contract('RentableObjects', function(accounts) {
//   it("should return about object id 1 & then Blank", function() {
//     var rent;
//     return RentableObjects.deployed().then(function(instance){
//       rent = instance;
//       // Add some sample data
//       rent.registerObject("1","abc","10","2");
//       return rent.registerObject("2","def","8","1");
//     }).then(function(){
//       return rent.getObjectDeposit.call("1");
//     }).then(function(result){
//       console.log("Deposit of 1: ", result);
//       assert.isTrue(result === "20000");
      
//       rent.unregisterObject("1");
//       return rent.getObjectDeposit.call("1");
//     }).then(function(result){
//       console.log("Deposit of 1: ", result);
//       assert.isTrue(result === "");
//     });
//   });
// });