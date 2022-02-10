import { useState } from 'react';
import useHotel from '../hook/useHotel';
import Spinner from './spinner';
const TransferTokenERC20 = () => {
  const { transferToken } = useHotel();
  const [valueAddressTransfer, setValueAddressTransfer] = useState('');
  const [status, setStatus] = useState('');
  const [colorStatus, setColorStatus] = useState('green');
  const [displaySpinner, setDisplaySpinner] = useState(false);
  let styleMessage = {
    textAlign: 'center',
    color: colorStatus,
  };

  return (
    <>
      <div id="TransferToken">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading"> Transfer Token</h4>
          <h3>
            You need to use "AL" token to rent room , you can Transfer "AL" token
            to your account
          </h3>
          <hr />

          <p className="mb-0">
            &nbsp; &nbsp;
            <h4 style={styleMessage}>{status}</h4>
            {displaySpinner && <Spinner />}
            <input
              type="text"
              className="form-control"
              aria-label="Default"
              placeholder="Transfer address"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => {
                setValueAddressTransfer(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setDisplaySpinner(true);
                transferToken(valueAddressTransfer)
                  .then((result) => {
                    setColorStatus('green');
                    setStatus('Transfer completed successfully');
                   })
                  .catch((err) => {
                    setColorStatus('red');
                    setStatus('There is a problem check the transfer address');
                  })
                  .finally(() => {
                    setDisplaySpinner(false);
                  });
              }}
              type="button"
              className="btn btn-primary"
            >
              Transfer
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
export default TransferTokenERC20;
