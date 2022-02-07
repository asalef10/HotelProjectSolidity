import { Image } from './image';
import { useContext, useState } from 'react';
import { MyContext } from '../context/context';
import useHotel from '../hook/useHotel';
import useERC20 from '../hook/useERC20';
import ApproveERC20 from './approveERC20';
import TransferTokenERC20 from './transferToken';
import Spinner from './spinner';

export const RentRoom = (props) => {
  const {
    owner,
    hotelRoom,
    isOnFunction,
    approveComponentIsOn,
    setApproveComponentIsOn,
    contractAddressHotel,
    tokenAddress,
    updateRoom,
  } = useContext(MyContext);

  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [status, setStatus] = useState('');

  const { RentARoom, freeRoom } = useHotel();
  const { allowance } = useERC20();

  const scroll = (res) => {
    console.log(res);
    setApproveComponentIsOn(true);
    window.scrollTo(0, 1700);
  };

  const bookRoom = (hotelRoomOneId) => { 
    setDisplaySpinner(true);
      window.scrollTo(0, 1900);
      RentARoom(hotelRoomOneId)
        .then((result) => {
          setStatus('');

          isOnFunction();
          let eventRoomTaken =
            result.events.RenetRoomEvent.returnValues;
          console.log(
            eventRoomTaken.idRoom,
            eventRoomTaken
          );
        })
        .catch(() => {
          setStatus('There was an error try again');
        })
        .finally(() => {
          setDisplaySpinner(false);
        });
  } 

  return (
    <div id="rent_room" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Book Room</h2>
          <h3>
            Payment is made using cryptocurrencies, with a MetaMask wallet
          </h3>
          <TransferTokenERC20 />
          {approveComponentIsOn && <ApproveERC20 />}
        </div>
        {displaySpinner && <Spinner />}
        <h4 style={{ color: 'red' }}>{status}</h4>
        <div className="row">
          <div className="portfolio-items">
            {hotelRoom
              ? hotelRoom.map((hotelRoomOne, i) => (
                  <div
                    key={`${hotelRoomOne.id}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={hotelRoomOne.title}
                      largeImage={hotelRoomOne.img}
                      smallImage={hotelRoomOne.img}
                    />
                    {hotelRoomOne.isCatch ? (
                      <button
                      onClick={() => {
                        setDisplaySpinner(true);
                        window.scrollTo(0, 1900);

                          freeRoom(hotelRoomOne.id).then((result) => {
                            updateRoom(hotelRoomOne.id - 1);
                            isOnFunction();
                          }).finally(() => { 
                            setDisplaySpinner(false);
                          });
                        }}
                        className="btn btn-danger"
                      >
                        Release Room
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          allowance(
                            owner,
                            contractAddressHotel,
                            tokenAddress
                          ).then((res) => {
                            res === '0'
                              ? scroll(res)
                              : 
                              bookRoom(hotelRoomOne.id)
                          });
                        }}
                        className="btn btn-primary"
                      >
                        Book A Room
                      </button>
                    )}
                  </div>
                ))
              : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  );
};
