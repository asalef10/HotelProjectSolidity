import erc20ABI from '../Articals/ERC20';
const Web3 = require('web3');
const useERC20 = () => {
  const web3 = new Web3(window.ethereum);
  let account = '';

  const allowance = async function (ownerAddress,contractAddressHotel, tokenAddress) {
    const ERC20Instance = new web3.eth.Contract(erc20ABI, tokenAddress);
    const balanceTx = await ERC20Instance.methods.allowance(
      ownerAddress,
      contractAddressHotel
    );
    let allowanceAmount = await balanceTx.call();
    return allowanceAmount;
  };

  const approve = async function (contractAddressHotel, tokenAddress) {
    const ERC20Instance = new web3.eth.Contract(erc20ABI, tokenAddress);

    const amountToApprove = web3.utils.toWei('10000', 'ether');
    const approveTx = await ERC20Instance.methods.approve(
      contractAddressHotel,
      amountToApprove
    );
    account = await web3.eth.getAccounts();

    return await approveTx.send({ from: account[0] });
  };
  return { approve, allowance };
};
export default useERC20;
