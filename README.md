# Dapp-Project
  1. Chuẩn bị
 - Tải và cài đặt extension MetaMask

2. Khởi chạy
   - Mở terminal,cd vào thư mục backend
   - Chạy lệnh npx hardhat node
   - Mở terminal khác, cd vào thư mục backend, chạy lệnh npx hardhat run scripts/deploy.js --network localhost
   - Copy địa chỉ contract hiện lên trên terminal
   - Cd vào thư mục client, mở file App.js điền địa chỉ contract vào dòng const contractAddress = ""
   - Chạy lệnh npm start
   - Đăng nhập ví MetaMask ở localhost 8545
