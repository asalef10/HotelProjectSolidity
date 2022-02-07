import { useContext } from 'react';
import { MyContext } from '../context/context';
import Web3 from 'web3';
const contractArtifact = require('../Articals/abi.json');

const useHotel = () => {
  const { contractAddressHotel } = useContext(MyContext);

  const web3 = new Web3(window.ethereum);
  let account = '';
  async function getAccount() {
    account = await web3.eth.getAccounts();
  }

  let Hotel = new web3.eth.Contract(contractArtifact.abi, contractAddressHotel);

  async function connectContract() {
    console.log(Hotel);
  }

  async function RentARoom(idRoom) {
    account = await web3.eth.getAccounts();
    const Rent = await Hotel.methods
      .RentARoom(idRoom)
      .send({ from: account[0] });
    return Rent;
  }
  async function isRenter(addressClient) {
    account = await web3.eth.getAccounts();
    const Renter = await Hotel.methods.isRenter(addressClient).call();
    return Renter;
  }

  async function getHotelRooms() {
    try {
      const Rooms = await Hotel.methods.getHotelRooms().call();
      return Rooms;
    } catch (error) {
      console.log(error);
    }
  }
  async function getOwner() {
    const owner = await Hotel.methods.owner().call();
    return owner;
  }
  async function getBalance() {
    const Balance = await Hotel.methods.getBalance().call();
    return Balance;
  }
  async function freeRoom(idRoom) {
    account = await web3.eth.getAccounts();
    const freeRoom = await Hotel.methods
      .freeRoom(idRoom)
      .send({ from: account[0] });
    return freeRoom;
  }
  async function showAddresCliked() {
    const AddressClient = await Hotel.methods.showAddresCliked().call();
    return AddressClient;
  }
  async function showPrice(idRoom) {
    account = await web3.eth.getAccounts();
    const showPrice = await Hotel.methods.showPrice(idRoom).call();
    return showPrice;
  }
  async function RoomPriceHotel(idRoom, newPrice) {
    account = await web3.eth.getAccounts();
    const showPrice = await Hotel.methods
      .RoomPriceHotel(idRoom, newPrice)
      .send({ from: account[0] });
    return showPrice;
  }
  async function transferToken(addressTransfer) {
    account = await web3.eth.getAccounts();
    const transfer = await Hotel.methods
      .transferToken(addressTransfer)
      .send({ from: account[0] });
    return transfer;
  }

  // Hotel.events.RenetRoomEvent({}, (e) => {
  //   console.log(e);
  // });
  async function eventHandler() {
    account = await web3.eth.getAccounts();
    return showPrice;
  }
  return {
    getHotelRooms,
    connectContract,
    getOwner,
    getBalance,
    RentARoom,
    getAccount,
    freeRoom,
    isRenter,
    showPrice,
    RoomPriceHotel,
    eventHandler,
    showAddresCliked,
    transferToken
  };
};
export default useHotel;
