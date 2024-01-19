import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import "./header.css";
const Header = () => {

const [account,setAccount]=useState('Not connected');
const provider = new ethers.providers.Web3Provider(window.ethereum)
const [accountBalance,setAccountBalance]=useState(0);

useEffect(() => {
    
    const getAccountConnect = async() =>{
      try{
        const {ethereum}=window;
            const account = await ethereum.request({
              method:"eth_requestAccounts"
            })
            setAccount(account[0])
            
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

  return (
    <div className="container">
        <div className="flex">
            <div className="title">
                <h1 className="title_header">DigitalArtFinder</h1>
                {/* <img src="https://d2m7ibezl7l5lt.cloudfront.net/img/v2/logo/artfinder-red.svg" alt="" /> */}
            </div>
            <div className="address">
                <h4>Connected account:{account.substring(0, 15)}...</h4>
            </div>
           
        </div>
      
    </div>
  )
}

export default Header
