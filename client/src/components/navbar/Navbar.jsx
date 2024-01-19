// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/transfer">Transfer</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        {/* <li><Link to="/buy">Buy</Link></li> */}
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/order">Order</Link></li>



      </ul>
    </div>
  );
}

export default Navbar;
