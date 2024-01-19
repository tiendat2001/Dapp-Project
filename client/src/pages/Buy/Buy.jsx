import React, { useEffect, useState } from 'react';
import "./buy.css"
import Header from '../../components/Header/Header'
import Navbar from '../../components/navbar/Navbar'
import { ethers } from "ethers";

const Buy = ({state}) => {
  const {contract}=state;
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const [accountBalance,setAccountBalance]=useState(0);
  const [account,setAccount]=useState('Not connected');

  const [listProduct, setListProduct] = useState([]);
  
  const [productToPurchase, setProductToPurchase] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log("use effect")
    const getAccountConnect = async() =>{
      try{
        const {ethereum}=window;
            const account = await ethereum.request({
              method:"eth_requestAccounts"
            })
            setAccount(account[0])
            getAccountBalance(account[0])
            // setSetlectedAccount(account[0])
          }catch(error){
            console.log(error)
          }
          window.ethereum.on("accountsChanged",()=>{
            // getAccountConnect()
            window.location.reload()

           })
    }
    getAccountConnect()

    // get list product
    const getListProduct = async () => {
      const listProduct = await contract.getProducts();
      setListProduct(listProduct)
    }
    contract && getListProduct()

  }, [contract])

  const getAccountBalance = async(accountAddress)=>{
    const balance = await provider.getBalance(accountAddress);
    const formattedBalance = ethers.utils.formatEther(balance);
    const roundedBalance = parseFloat(formattedBalance).toFixed(2);
    setAccountBalance(roundedBalance);

  }
  // const buyProduct = async (sellerAddress,productPrice,productName) => {
  //   console.log("testst"+productPrice) // so 3
  //   const message = "Buy Digital Art " + productName;
  //   const email ="test@gmail.com"
  //   // const buyThing=await contract.transferToAccount(sellerAddress, { value: ethers.utils.parseEther(productPrice) })
  //   const buyThing=await contract.buyProduct(message,sellerAddress,productName,email, { value: ethers.utils.parseEther(productPrice) })


  //   // parseEther in wei la 30000000
  //   await buyThing.wait()
  //   getAccountBalance(account)
  // }


  const handlePurchase = async (sellerAddress, productPrice, productName) => {
    console.log("mo")
    openModal(sellerAddress, productPrice, productName);
  }

  const openModal = (sellerAddress, productPrice, productName) => {
    setProductToPurchase({ sellerAddress, productPrice, productName });
    setShowModal(true);
  }

  const closeModal = () => {
    setProductToPurchase({});
    setShowModal(false);
    setEmail("")
  }
  

  const confirmPurchase = async () => {
   
    const { sellerAddress, productPrice, productName } = productToPurchase;
    const message = `Buy Digital Art ${productName}`;
    console.log(productPrice)
    // Close the modal
  

    // Perform the purchase
    if (email.trim() == '') {
      alert("Please enter your email to purchase")
    }else{
      const buyThing = await contract.buyProduct(
        message,
        sellerAddress,
        productName,
        email,
        { value: productPrice }
      );
  
      await buyThing.wait();
      getAccountBalance(account);
      closeModal();
    }
    
  }
  return (
    <div className="container">
        <Header/>
        <Navbar/>
        {/* <button onClick={() => buyProduct("Example Product", "1")} >Click me</button>  */}
        <h4 className="balance">Current balance: {accountBalance} ETH</h4> 
        <div className="title_buy">
          <h5>Digital Artwork for you</h5>
          </div>
          <div class="black-line"></div>

        <div className="product_list">
          <div className="product_card">
            <div className="content">
              <img className="product_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVc-4o7IdT69hEtsRoNoNKuzbRDKMszUrTKg&usqp=CAU" alt="" />
              <h3>Nature</h3>
              <p>This masterpiece invites observers to share in the awe-inspiring spectacle of nature, where the vast expanse of the sky becomes a timeless backdrop for the shared contemplation of two souls 
                immersed in the beauty of the world around them.</p>
                <h2>Seller address: 0x90F79bf6EB2c4f870365E785982E1f101E93b906</h2>
                <div className="product_price">
                  <div className="price_box">
                      <h6>Price</h6>
                      <h6>1 ETH</h6>
                  </div>
                  
                  <button className="btn_buy" onClick={() => handlePurchase("0x90F79bf6EB2c4f870365E785982E1f101E93b906", "1000000000000000000","Buy Nature")} >Purchase</button> 
                </div>
               
            </div>
          </div>

          <div className="product_card">
            <div className="content">
              <img className="product_img" src="https://i.ytimg.com/vi/3Wb9uVghr0w/maxresdefault.jpg" alt="" />
              <h3>Nature 2</h3>
              <p>The digital art piece showcasing a woodland landscape unfolds a mesmerizing tapestry of nature, where the intricate details of a thriving forest are brought to life through the lens of digital artistry. In this captivating artwork, a lush canopy of trees stretches majestically. 
           </p>
                <h2>Seller address: 0x90F79bf6EB2c4f870365E785982E1f101E93b906</h2>
                <div className="product_price">
                  <div className="price_box">
                      <h6>Price</h6>
                      <h6>1 ETH</h6>
                  </div>
                  
                  <button className="btn_buy" onClick={() => handlePurchase("0x90F79bf6EB2c4f870365E785982E1f101E93b906", "1000000000000000000","Buy Nature 2")} >Purchase</button> 
                </div>
               
            </div>
          </div>

          <div className="product_card">
            <div className="content">
              <img className="product_img" src="https://bst.icons8.com/wp-content/themes/icons8/app/uploads/2019/06/digital-illustration-brian-edward-miller-5.jpg" alt="" />
              <h3>Nature 3</h3>
              <p>The digital art piece depicting the countryside unveils a serene panorama, where the rustic charm of rural life is seamlessly blended with the sophistication of digital artistry. 
                In this artwork, expansive fields of lush green crops sway gracefully in the gentle breeze.</p>
                <h2>Seller address: 0x90F79bf6EB2c4f870365E785982E1f101E93b906</h2>
                <div className="product_price">
                  <div className="price_box">
                      <h6>Price</h6>
                      <h6>1 ETH</h6>
                  </div>
                  
                  <button className="btn_buy" onClick={() => handlePurchase("0x90F79bf6EB2c4f870365E785982E1f101E93b906", "1000000000000000000","Buy Nature 3")} >Purchase</button> 
                </div>
               
            </div>
          </div>
        
          {listProduct
          .filter(product => product.sellerAccount.toLowerCase() !== account.toLowerCase())
          .map((product, index) => (
                <div key={index} className="product_card">
                    <div className="content">
                        <img className="product_img" src={product.imageLink} alt="" />
                        <h3>{product.productName}</h3>
                        <p>{product.description}</p>
                        <h2>Seller address: {product.sellerAccount}</h2>
                        <div className="product_price">
                            <div className="price_box">
                                <h6>Price</h6>
                                <h6>{(product.price/1000000000000000000).toString()} ETH</h6>
                            </div>
                            <button className="btn_buy" onClick={() => handlePurchase(product.sellerAccount, product.price.toString(),product.productName)}>
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        
        
        
        </div>

        <div className="title_buy">
          <h5>Your Artwork </h5>
          </div>
          <div class="black-line"></div>
          <div className="product_list">
          {listProduct
          .filter(product => product.sellerAccount.toLowerCase() == account.toLowerCase())
          .map((product, index) => (
                <div key={index} className="product_card">
                    <div className="content">
                        <img className="product_img" src={product.imageLink} alt="" />
                        <h3>{product.productName}</h3>
                        <p className="product_des">{product.description}</p>
                        <h2>Seller address: {product.sellerAccount}</h2>
                        <div className="product_price">
                            <div className="price_box">
                                <h6>Price</h6>
                                <h6>{(product.price/1000000000000000000).toString()} ETH</h6>
                            </div>
                            <button className="btn_buy" onClick={() => handlePurchase(product.sellerAccount, product.price.toString(),product.productName)}>
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        {/* Modal */}
      {showModal && (
        <div className="modalConfirm">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 className="modal_title">Do you want to buy {productToPurchase.productName}</h2>
            <h2 className="modal_text">Price: {(productToPurchase.productPrice)/1000000000000000000} ETH</h2>
            <input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="modal_container-btn">
              <button className="modal_btn" onClick={confirmPurchase}>Confirm</button>
            </div>
        
          </div>
        </div>
      )}
            
            
        </div>

   
  )
}

export default Buy
