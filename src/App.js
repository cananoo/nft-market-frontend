import './App.css';
import { useState,useEffect } from 'react';
import Navbar from './components/NavBar';
import UploadSuccess from './components/UploadSuccess';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadImage from './components/UploadImage';

import NFTGrid from './components/NFTGrid';
import NFTDetail from './components/NFTDetail';


function App() {

  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
   // getWalletAddress();
    addWalletListener();
  }, []);

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      } else {
        setWalletAddress("")
      }
    })
  } else {
    alert("Please install MetaMask")
  }
}

  async function getWalletAddress() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletAddress(account)
    }else{
      alert("Please install MetaMask")
    }
  }

  return (
    <div className='container'>
          <Router>
            <Navbar onConnectWallet={getWalletAddress} walletAddress={walletAddress}/>
            <Routes>
              <Route path="/create-nft" exact element={<UploadImage address={walletAddress} />} />
              <Route path="/success" element={<UploadSuccess />} />
              <Route path="/" element={<NFTGrid />} />
              <Route path="/nft-detail/:tokenId" element={<NFTDetail />} />
            </Routes>
          </Router>
      </div>
  );
}

export default App;
