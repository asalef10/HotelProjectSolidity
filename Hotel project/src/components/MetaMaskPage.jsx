import React, { useLayoutEffect, useState } from 'react';
import { useEffect } from 'react';

function MetaMaskPage({}) {
  const [textMessage, setTextMessage] = useState('');
  const [isNetwork, setIsNetwork] = useState(false);
  const [isMetaMask, setIsMetaMask] = useState(false);
  const [showComponent, setShowComponent] = useState('none');
 

  document.body.style = 'background:rgba(137, 166, 192, 0.16);';
  useLayoutEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.chainId !== '0x13881') {
        setTimeout(() => {
          setShowComponent('');
        }, [1000]);
        setIsNetwork(true);
        setTextMessage(
          'Virtuswap AMM currently works on Polygon testnet (Mumbai) Please switch to Mumbai Network'
        );
      }
    } else {
      setIsMetaMask(true);
      setTextMessage('To use Virtuswap AMM, please install metamask extension');
    }
  }, []);

  return (
    <div>
      <div
        id="containerId"
        className="container"
        style={{
          display: `${isNetwork && showComponent}`,
          textAlign: 'center',
          margin: '230px auto',
          width: '70%',
          border: '3px solid black',
          background: 'white',
        }}
      >
        <div style={{ padding: '25px' }}>
          <h2>{textMessage}</h2>
          <br />
          <br />
          {isMetaMask ? (
            <button
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              style={{ border: '2px solid black', display: 'inline-flex' }}
            >
              {' '}
              <img
                src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/a9q9vb3gzdnibfegyyma"
                width="25px"
                alt=""
              />{' '}
              Install metamask
            </button>
          ) : isNetwork ? (
            <button
              style={{ border: '2px solid black' }}
            >
              Switch Network
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default MetaMaskPage;
