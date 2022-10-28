import { ethers } from "ethers";
import React from "react";
import { useState, useCallback } from "react";

function NFT() {
  // create states
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    // get provider and signer
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    setLoading(true);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    // fetch abi
    const response = await fetch(
      "https://etherdata-blockchain.github.io/msbd5017-docs/docs/05-Chapter5/files/MyNFT.json"
    );
    const jsonData = await response.json();
    const abi = jsonData.abi;

    // create contract instance
    const contractAddress = "0x88e47909A56BA9822b78791a485d5804c5D5e80F";
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // mint a new NFT
    const tx = await contract.awardItem(
      signer.getAddress(),
      "https://files.etdchain.net/mynft.png"
    );
    await tx.wait();

    // check balance
    const balance = await contract.balanceOf(await signer.getAddress());
    setBalance(JSON.stringify(balance) as any);
    setLoading(false);
  }, []);

  return (
    <div>
      <div>
        <p>Balance: {loading ? "Loading..." : balance}</p>
      </div>
      <button onClick={onClick}>Award Item</button>
    </div>
  );
}

export default NFT;
