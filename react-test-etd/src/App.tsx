import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import cover from "../assets/nike-air-force_2x.png";
import model from "../assets/AirForcex.usdz";

const App = () => {
  const [signerAddress, setSignerAddress] = useState("");
  const [signerBalance, setSignerBalance] = useState<any>("");

  const getInfo = async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    // The signer address
    setSignerAddress(await signer.getAddress());
    const balance = await signer.getBalance();
    console.log(balance);
    // setSignerBalance(await signer.getBalance());
  };

  useEffect(() => {
    // getInfo();
  }, []);
  return (
    <div>
      <div>
        <a
          rel="ar"
          href={"https://developer.apple.com/ar/photogrammetry/AirForce.usdz"}
        >
          <img src={cover} />
        </a>
      </div>
      <div>
        <p>Signer Address: {signerAddress}</p>
        <p>Signer Balances: {signerBalance}</p>
      </div>
      <button onClick={getInfo}>Connect to MetaMask</button>
    </div>
  );
};

export default App;
