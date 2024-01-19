import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Transfer from './pages/transfer/Transfer'
import Transactions from './pages/transactions/Transactions';
import Home from './pages/home/Home';
import Buy from './pages/Buy/Buy';
import SellProduct from './pages/SellProduct/SellProduct';
import Order from './pages/Order/Order';
function App() {

  const [state, setState] = useState({
    contract: null
  })
  useEffect(() => {
    const contractInit = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const ABI = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_productName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_imageLink",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "addProduct",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "productMessage",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "nameProduct",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            }
          ],
          "name": "buyProduct",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getOrders",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "buyerAccount",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "sellerAccount",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nameProduct",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "emailBuyer",
                  "type": "string"
                }
              ],
              "internalType": "struct Contract.Order[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getProducts",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "sellerAccount",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "productName",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "imageLink",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "description",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Contract.Product[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTransactions",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "message",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "blockNumber",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "internalType": "struct Contract.Transaction[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "listProducts",
          "outputs": [
            {
              "internalType": "address",
              "name": "sellerAccount",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "productName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageLink",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            }
          ],
          "name": "transferToAccount",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      setState({ contract });
    }
    contractInit();

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Buy state={state}/>} />
        <Route path="/transfer" element={<Transfer state={state} />} />
        <Route path="/transactions" element={<Transactions state={state} />} />
        <Route path="/sell" element={<SellProduct state={state}/>} />
        <Route path="/order" element={<Order state={state} />} />



      </Routes>
    </BrowserRouter>

  );
}

export default App;