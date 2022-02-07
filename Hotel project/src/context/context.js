import { useEffect } from 'react';
import { createContext, useState } from 'react';
export const MyContext = createContext();
export const MyProvider = MyContext.Provider;

const UseContext = ({ children }) => {
  const [owner, setOwner] = useState('');
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [ownerHaveRooms, setOwnerHaveRooms] = useState('');
  const [test, setTest] = useState([]);
  const [boolean, setBoolean] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [approveComponentIsOn, setApproveComponentIsOn] = useState(false);
  let contractAddressHotel = '0x63e733E0Bc4d50a56A6ab610Bd89aA2f5b1091D7';
  let tokenAddress = '0xDFe12475bD1b3202AC254EF00D678CdAAf4D9A61';
  const [hotelRoom, setHotelRoom] = useState([
    {
      id: 1,
      title: 'Book A room',
      img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      isCatch: false,
      ownerID: null,
    },

    {
      id: 2,
      title: 'Book A room',
      img: 'https://images.unsplash.com/photo-1559599238-308793637427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      isCatch: false,
      ownerID: null,
    },

    {
      id: 3,
      title: 'Book A room',
      img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      isCatch: false,
      ownerID: null,
    },

    {
      id: 4,
      title: 'Book A room',
      img: 'https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      isCatch: false,
      ownerID: null,
    },

    {
      id: 5,
      title: 'Book A room',
      img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      isCatch: false,
      ownerID: null,
    },

    {
      id: 6,
      title: 'Book A room',
      img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      isCatch: false,
      ownerID: null,
    },
  ]);

  const newDetilsAboutRoom = async (item) => {
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < hotelRoom.length; j++) {
        if (Number(item[i].idRoom) === hotelRoom[j].id) {
          hotelRoom[j]['ownerID'] = item[i].renter;
          hotelRoom[j]['isCatch'] = item[i].taken;
        }
        setHotelRoom(hotelRoom);
      }
    }
    setOccupiedRooms(item);
    return item;
  };
  const [numberCounter, setNumberCounter] = useState(-1)
  
  const updateRoom = async (numberRoom) => {
    hotelRoom[numberRoom]['isCatch'] = false;
    hotelRoom[numberRoom]['ownerID'] = null;
    setHotelRoom(hotelRoom);
    setNumberCounter(numberRoom )
    return hotelRoom;
  };
  useEffect(() => {
    setHotelRoom(hotelRoom);
    
  }, [numberCounter]);

  const isOnFunction = () => {
    if (!isOn) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  };

  return (
    <MyProvider
      value={{
        owner,
        setOwner,
        occupiedRooms,
        setOccupiedRooms,
        ownerHaveRooms,
        setOwnerHaveRooms,
        hotelRoom,
        setHotelRoom,
        newDetilsAboutRoom,
        test,
        setTest,
        boolean,
        setBoolean,
        isOn,
        setIsOn,
        approveComponentIsOn,
        setApproveComponentIsOn,
        contractAddressHotel,
        tokenAddress,
        isOnFunction,
        updateRoom,
      }}
    >
      {children}
    </MyProvider>
  );
};
export default UseContext;
