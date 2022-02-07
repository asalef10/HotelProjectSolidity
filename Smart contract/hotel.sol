// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
 pragma abicoder v2;
 
 import "../ERC20/ERC20.sol";

 struct HotelRoom{
     uint idRoom;
     bool taken;
     address renter;
     uint price;
}
 
 contract Hotel {

    HotelRoom[] rooms;

     address payable public owner;
     address payable  tokenAddressERC20;
     address payable public  deposit;
     address payable public initialize;
     address payable public takeToken;

    event RenetRoomEvent(uint idRoom,address addressRenet);
    event transferTokenEvent(address TransferAddress);

    constructor() {
        owner = payable(msg.sender);
        tokenAddressERC20 = payable(0xDFe12475bD1b3202AC254EF00D678CdAAf4D9A61);
        deposit = payable(0xB408273eB24F131D92515e916c673Cbe38b866ED);
        takeToken = payable(0x63BA4376d0ae281A2Bf6178E209B3b7cd6b29062);
        for(uint i = 0;i<=6;i++){

        rooms.push();
         HotelRoom storage room = rooms[rooms.length - 1];
        room.taken = false;
        room.renter = address(0);
        room.price = 0.001 ether;
}
    }
    
   function RoomPriceHotel(uint256 roomNumber,uint price ) public {
       rooms[roomNumber].price = price;
   } 
   function showPrice(uint roomNumber)view public returns(uint) {
     return rooms[roomNumber].price;
   }
    function getHotelRooms() view public returns(HotelRoom[] memory) {
        return rooms;
    }
    function getFreeRoom()view public returns(uint256) {
         uint256 returnValue = 9999999999999;

        for (uint256 i = 0; i < rooms.length; i++) {
            if (!rooms[i].taken) {
                returnValue = i;
            }
        }
        return returnValue;
    }
    function getRoomAt(uint256 id) public view returns(HotelRoom memory){
        return rooms[id];
    }
    function showAddresCliked()public view returns(address) {
        return msg.sender;
    }
    function freeRoom(uint256 idFreeRoom) public{
        require(rooms[idFreeRoom].renter == msg.sender,"wrong address");

        rooms[idFreeRoom].taken = false;
        rooms[idFreeRoom].renter = address(0);

        uint price = rooms[idFreeRoom].price;

        uint depositAmount = price / 20;
         ERC20(tokenAddressERC20).transferFrom(deposit,msg.sender,depositAmount);
}
    function transferToken(address addressTransfer)public {
        uint price = 0.001 ether;
        ERC20(tokenAddressERC20).transferFrom(takeToken,addressTransfer,price);
        emit transferTokenEvent(addressTransfer);
    }

    function isRenter(address addresClient) public view returns(HotelRoom[] memory) {
         return checkingIfPurchased(addresClient);
    }


    function isRenterTwo() public view returns(HotelRoom[] memory) {
             return  checkingIfPurchased(msg.sender);
    }
    function checkingIfPurchased(address addresClient) public view returns(HotelRoom[] memory){
          HotelRoom[] memory OccupiedRooms = new HotelRoom[](rooms.length);
            uint j = 0;
            for (uint256 i = 0; i < rooms.length; i++) {
            if(addresClient == rooms[i].renter){
             OccupiedRooms[j].taken = rooms[i].taken;
             OccupiedRooms[j].renter = rooms[i].renter;
             OccupiedRooms[j].idRoom = rooms[i].idRoom;
            j++;
            }
        }
                return OccupiedRooms;
    }

    function getBalance()  public view returns(uint){
      require(msg.sender == owner,"only manger can see balance");
       return  address(this).balance;
    }
    function RentARoom(uint256 id) public {

     HotelRoom storage room = rooms[id];
     
     uint depositAmount = room.price / 20;
        ERC20(tokenAddressERC20).transferFrom(msg.sender,address(this),room.price);
        room.idRoom = id;
        room.taken = true;
        room.renter = msg.sender;

        ERC20(tokenAddressERC20).transfer(deposit,depositAmount);
        ERC20(tokenAddressERC20).transfer(owner,room.price - depositAmount);
        emit RenetRoomEvent(id,msg.sender);
    }
      
}