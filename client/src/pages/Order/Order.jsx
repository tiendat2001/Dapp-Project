import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Navbar from '../../components/navbar/Navbar';
import "./order.css";
import Header from '../../components/Header/Header';
const Order = ({ state }) => {
  const { contract } = state;
  const [account, setAccount] = useState('Not connected');
//   const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);

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
      const listOrder = await contract.getOrders();
      setOrders(listOrder)
    }
    contract && getListTrans()

  }, [contract])

  return (
    <div className="container">
      <Header/>
      <Navbar />
    
      <h3 style={{ textAlign: "center", marginTop: "20px" ,marginBottom:"20px"}}>Your Order</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Buyer</th>
            <th>Product Name</th>
            <th>Email</th>

          </tr>
        </thead>
        <tbody >
          {orders
          .filter(od => od.sellerAccount.toLowerCase() == account.toLowerCase() )
          .map((od,index) => {
            return (
              <tr key={index}>
                <td className={index % 2 === 0 ? 'even' : 'odd'}>{index + 1}</td>
                <td className="even">{od.buyerAccount}</td>
                <td className="odd">{od.nameProduct}</td>
                <td className="even">{od.emailBuyer}</td>
                {/* <td className="odd">{od.sellerAccount}</td> */}



                
              </tr>

            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Order
