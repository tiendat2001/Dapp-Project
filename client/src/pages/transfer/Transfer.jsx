import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/Header/Header';
function Transfer({state}) {
  const {contract}=state;
  // const provider = state.provider
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const [transferValue, setTransferValue] = useState(0);
  const [receiveAddress, setReceiveAddress] = useState(0);
  const [account,setAccount]=useState('Not connected');
  const [accountBalance,setAccountBalance]=useState(0);
  const [processing, setProcessing] = useState(false);
  const [transferError,setTransferError] = useState(false)

  // phan hien thi giao dich
  const [transactions,setTransactions]=useState([]);

  
  useEffect(() => {
    
    const getAccountConnect = async() =>{
      try{
        const {ethereum}=window;
            const account = await ethereum.request({
              method:"eth_requestAccounts"
            })
            setAccount(account[0])
            getAccountBalance(account[0])

          }catch(error){
            console.log(error)
          }
          window.ethereum.on("accountsChanged",()=>{
            // getAccountConnect()

            window.location.reload()

           })
    }
    getAccountConnect()

  }, [])

  const getAccountBalance = async(accountAddress)=>{
    const balance = await provider.getBalance(accountAddress);
    const formattedBalance = ethers.utils.formatEther(balance);
    const roundedBalance = parseFloat(formattedBalance).toFixed(2);
    setAccountBalance(roundedBalance);
  }

  const handleTransferChange = (e) => {
    setTransferValue(e.target.value);
  }

  const handleReceiveAddressChange = (e) => {
    setReceiveAddress(e.target.value);
  }

  const transferSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); 
    const amount=transferValue.toString()
    try{
      const transfer=await contract.transferToAccount(receiveAddress, { value: ethers.utils.parseEther(amount) })
      await transfer.wait()
      setTransferError(false)
      alert("Transfer successful")
    }catch(error){
      console.log(error)
      setTransferError(true)
      setProcessing(false);
    }
  
    getAccountBalance(account)
    setProcessing(false);
  }

 
  return (
    <div className="container">
    
      {/* TRANSFER */}
      <Header/>
      <Navbar/>
     {/* <h4>Wallet address connected:{account}</h4>  */}
      <h4>Current balance: {accountBalance} ETH</h4> 
      <label >Enter the Wallet address and ETH value to transfer money from your wallet to another. </label>

      {/* <button onClick={test} >Click me</button> */}
      <form onSubmit={transferSubmit}>

        <div className="mb-3">
          <label >Wallet address</label>
          <input type="string" className="form-control" placeholder="0" onChange={handleReceiveAddressChange} value={receiveAddress} />
        </div>

        <div className="mb-3">
          <label >ETH value</label>
          <input type="number" className="form-control" placeholder="0" onChange={handleTransferChange} value={transferValue} />
        </div>

        <button type="submit" className="btn btn-success" disabled={processing}>{processing ? "Processing..." : "Transfer"}</button>
        {transferError && <p className="text-danger">There was an error with the transfer. Please try again. Make sure enter correct address</p>}

      </form>
    </div>

  );
}

export default Transfer;
