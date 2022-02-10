import useERC20 from '../hook/useERC20';
import { useContext, useState } from 'react';
import { MyContext } from '../context/context';
import Spinner from './spinner';

const ApproveERC20 = () => {
  const { setApproveComponentIsOn, contractAddressHotel, tokenAddress } =
    useContext(MyContext);
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [status, setStatus] = useState('');

  const { approve } = useERC20();

  const approveFunction = () => {
    setDisplaySpinner(true);
    approve(contractAddressHotel, tokenAddress)
      .then((res) => {
        setApproveComponentIsOn(false);
      })
      .catch(() => {
        setStatus('You have error try agin');
      })
      .finally(() => {
        setDisplaySpinner(false);
      });
  };

  const cancel = () => {
    setApproveComponentIsOn(false);
  };

  return (
    <>
      <div id="ApproveERC20">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading"> almost done!</h4>
          <h3>You need to Approve in MetaMask before purchasing a room</h3>
          <h5 style={{ color: 'red', textAlign: 'center' }}>{status}</h5>
          {displaySpinner && <Spinner />}
          <hr />
          <p className="mb-0">
            <button
              onClick={() => {
                cancel();
              }}
              type="button"
              className="btn btn-danger"
            >
              Cancel
            </button>
            &nbsp; &nbsp;
            <button
              onClick={() => {
                approveFunction();
              }}
              type="button"
              className="btn btn-primary"
            >
              Approve
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
export default ApproveERC20;
