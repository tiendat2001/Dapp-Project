import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/Header/Header'
import { ethers } from "ethers";
import "./sellProduct.css"


const SellProduct = ({ state }) => {
  const { contract } = state;

  const [productName, setProductName] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Product field

  const addProduct = async () => {
    if (!productName || !imageLink || !description || !price) {
      alert("Please fill in all the fields");
      return;
  }
    try {
      const priceInWei = ethers.utils.parseUnits(price.toString(), "ether");

      const addProduct = await contract.addProduct(productName, imageLink, description, priceInWei);
      console.log("add" + price) // so 3
      addProduct.wait()
      alert("Product added successfully!")

      setProductName("");
      setImageLink("");
      setDescription("");
      setPrice("");
      // console.log('Product added successfully!');
    } catch (error) {
      console.log('Error adding product:', error.message);
    }
  }
  return (
    <div className="container">
      <Header />
      <Navbar />
      <h2 className="title_product">Product Information</h2>
      <h6>Fill information of product you want to sell</h6>
      <div className="form_input">
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <label>Image Link:</label>
        <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Price (ETH):</label>
        <input type="string" value={price} onChange={(e) => setPrice(e.target.value)} />
        <div className="btn">
        <button className="btn_sell" onClick={addProduct}>Add Product</button>

        </div>
      </div>


    </div>
  )
}

export default SellProduct
