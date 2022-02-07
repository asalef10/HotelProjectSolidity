import { useState, useEffect, useContext } from 'react';
import { Navigation } from './components/navigation';
import { Header } from './components/header';
import { Features } from './components/features';
import { About } from './components/about';
import { RentRoom } from './components/rentRoom';
import { Testimonials } from './components/testimonials';
import { Developer } from './components/developer';
import { Contact } from './components/contact';
import JsonData from './data/data.json';
import SmoothScroll from 'smooth-scroll';
import { MyContext } from '../src/context/context.js';
import useHotel from '../src/hook/useHotel';
import Web3 from 'web3';

import './App.css';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const { owner, setOwner, newDetilsAboutRoom, isOn } = useContext(MyContext);

  const { isRenter } = useHotel();

  let web3 = {};

  class HotelRoom {
    constructor(idRoom, renter, taken) {
      this.idRoom = idRoom;
      this.renter = renter;
      this.taken = taken;
    }
  }

  async function paraseHotelRoom(Hotel) {
    let arr = [];
    for (let i = 0; i < Hotel.length; i++) {
      let hl = new HotelRoom(Hotel[i].idRoom, Hotel[i].renter, Hotel[i].taken);
      arr.push(hl);
    }
    return arr;
  }

  async function callService(account) {
    isRenter(account[0]).then((result) => {
      paraseHotelRoom(result).then((newResult) => {
        newDetilsAboutRoom(newResult);
      });
    });
  }
  const [landingPageData, setLandingPageData] = useState({});
  const [chainId, setSetChainId] = useState('');

  useEffect(() => {
    (async () => {
      setLandingPageData(JsonData);
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          setSetChainId(window.ethereum.chainId);
          window.ethereum.on('accountsChanged', function (accounts) {
            setOwner(accounts[0]);
          });
          if (window.ethereum.selectedAddress) {
            web3.eth.getAccounts().then((account) => {
              callService(account);
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
      }
    })();
  }, [owner, isOn]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', function (chain) {
        setSetChainId(chain);
      });

      web3.eth.getAccounts().then((account) => {
        setOwner(account[0]);
      });
    }
  }, []);

  return (
    <>
      {chainId !== '0x13881' ? (
        <Navigation
          netWorkMessage={landingPageData.netWorkMessage}
          network={landingPageData.networkDataPolygonTest}
        />
      ) : (
        <Navigation />
      )}
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <RentRoom />
      <Testimonials data={landingPageData.Testimonials} />
      <Contact data={landingPageData.Contact} />
      <Developer data={landingPageData.Team} />
    </>
  );
};

export default App;
