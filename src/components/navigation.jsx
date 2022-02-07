import { useContext } from 'react';
import { MyContext } from '../context/context';

export const Navigation = (props) => {
  const { owner } = useContext(MyContext);

  const connectMetaMaskMethod = async () => {
    window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const polygonTestNetwork = async () => {
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: props.network,
    });
  };
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          {window.ethereum ? (
            window.ethereum?.selectedAddress ? (
              <h3>{`${owner && owner.slice(0, 6)}...${
                owner && owner.slice(-4)
              }`}</h3>
            ) : (
              <button className="btn btn-info" onClick={connectMetaMaskMethod}>
                {' '}
                connect MetaMask
              </button>
            )
          ) : (
            <>
              <h4 style={{ color: 'red' }}>
                you need install metamask wallet extension to use this website.
              </h4>
              <a
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                target="_blank"
              >
                <p className="btn btn-info">install metamask</p>{' '}
              </a>
            </>
          )}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          {props.netWorkMessage && (
            <>
              <h4 style={{ color: 'red', textAlign: 'center' }}>
                {props.netWorkMessage}
                <br />
                <button onClick={polygonTestNetwork} className="btn btn-info">
                  Switch Network
                </button>
              </h4>
            </>
          )}
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Enjoy
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#rent_room" className="page-scroll">
                Book Room
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
              <a href="#developer" className="page-scroll">
                The Developer
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
