import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Navbar from '../../components/navbar/Navbar';
import "./transactions.css";
import Header from '../../components/Header/Header';
const Transactions = ({ state }) => {
  const { contract } = state;
  const [account, setAccount] = useState('Not connected');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    const getAccountConnect = async () => {
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })
        setAccount(account[0])

      } catch (error) {
        console.log(error)
      }
      window.ethereum.on("accountsChanged", () => {
        // getAccountConnect()
        window.location.reload()
      })
    }
    getAccountConnect()

    const getListTrans = async () => {
      const transactions = await contract.getTransactions();
      setTransactions(transactions)
      // console.log(transactions)
    }
    contract && getListTrans()

  }, [contract])

  return (
    <div className="container">
      <Header/>
      <Navbar />
      {/* <h4>Wallet address connected:{account}</h4> */}
      {/* <h4>Balance: {accountBalance}</h4> */}
      <h3 style={{ textAlign: "center", marginTop: "20px" ,marginBottom:"20px"}}>Your Transaction List</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th style={{width:"100px"}} >Amount(ETH)</th>
            <th>Message</th>
            <th>Time</th>

          </tr>
        </thead>
        <tbody >
          {transactions
          .filter(trans => trans.recipient.toLowerCase() == account.toLowerCase() || trans.sender.toLowerCase() == account.toLowerCase())
          .map((trans,index) => {
            return (
              <tr key={index}>
                <td className={index % 2 === 0 ? 'even' : 'odd'}>{index + 1}</td>
                <td className="even">{trans.sender}</td>
                <td className="odd">{trans.recipient}</td>
                <td className="even">{ethers.utils.formatEther(trans.amount)}</td>
                <td className="odd">{trans.message}</td>
                <td className="even">{new Date(trans.timestamp * 1000).toLocaleString()}</td>
                {/* <td className="odd">{trans.blockNumber.toString()}</td> */}


                
              </tr>

            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions
