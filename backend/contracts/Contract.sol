//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Contract {
    string private greeting;
     struct Transaction {
        address sender;   
        address recipient; 
        uint256 amount;
        string message;  
        uint256 blockNumber; 
        uint timestamp; 
    }

    struct Product {
        address sellerAccount; 
        string productName;
        string imageLink;
        string description;
        uint256 price;
    }

    struct Order{
        address buyerAccount;
        address sellerAccount;
        string nameProduct;
        string emailBuyer;

    }
    Transaction[] transactions;
    Product[] public listProducts;
    Order[] listOrder;

    // khoi tao
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function transferToAccount(address payable recipient) external payable {
        require(recipient != address(0), "Invalid recipient address");
        require(msg.value > 0, "Amount must be greater than 0");
        

        recipient.transfer(msg.value);
        transactions.push(Transaction(msg.sender,recipient,msg.value,"Transfer money to wallet",block.number,block.timestamp));

    }

     function buyProduct(string calldata productMessage, address payable recipient,string calldata nameProduct, 
     string calldata email) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient address");
        recipient.transfer(msg.value);
        transactions.push(Transaction(msg.sender, recipient, msg.value, productMessage, block.number,block.timestamp));

        // them
        listOrder.push(Order(msg.sender,recipient,nameProduct,email));
    }

    function addProduct(
        string calldata _productName,
        string calldata _imageLink,
        string calldata _description,
        uint256 _price
    ) external {
        listProducts.push(Product(msg.sender, _productName, _imageLink, _description, _price)); 
    }


    function getTransactions() public view returns(Transaction[] memory){
        return transactions;
    }

    function getProducts() public view returns (Product[] memory) {
        return listProducts;
    }

    function getOrders() public view returns (Order[] memory) {
        return listOrder;
    }


    fallback() external payable {
        console.log("----- fallback:", msg.value);
    }

    // receive() external payable {
    //     console.log("----- receive:", msg.value);
    // }
}

