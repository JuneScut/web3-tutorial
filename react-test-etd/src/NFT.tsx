import { ethers, Wallet } from "ethers";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

const ACCOUNT = {
  PK: "8809ca26ec2926883a2a1d4bfda128d12b40ac0affea93fec099a6a078defe34",
  ADDRESS: "0x3d71519280e40f6ec003645c86761EF479040002",
};

const ContractAddress = "0x939a26F6019A52AB943dC603e4699F5bBBdC1ac2";

function NFT() {
  // create states
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  const [signer, setSinger] = useState<Wallet | null>();

  useEffect(() => {
    // get provider and signer
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    setLoading(true);
    const wallet = new ethers.Wallet(ACCOUNT.PK, provider);
    setSinger(wallet);
  }, []);

  const onClick = useCallback(async () => {
    setLoading(true);
    // fetch abi
    const response = await fetch(
      "https://ellila-images-1253575386.cos.ap-nanjing.myqcloud.com/ARNFT.json"
    );
    const jsonData = await response.json();
    const abi = jsonData.abi;

    // create contract instance
    const contract = new ethers.Contract(ContractAddress, abi, signer);

    // mint a new NFT
    const tx = await contract.awardItem(
      ACCOUNT.ADDRESS,
      "https://developer.apple.com/augmented-reality/quick-look/models/cosmonaut/cosmonaut_2x.png"
    );
    await tx.wait();

    // check balance
    const balance = await contract.balanceOf(await signer.getAddress());
    setBalance(JSON.stringify(balance) as any);
    setLoading(false);
    console.log(contract.tokenURI(1));
  }, [signer]);

  const getBalance = async () => {
    if (signer) {
      const balanceInEther = await signer.getBalance();
      setBalance(ethers.utils.formatEther(balanceInEther));
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <p>Balance: {loading ? "Loading..." : balance}</p>
      </div>
      <div>
        <button onClick={getBalance}>Get Balance</button>
      </div>
      <button onClick={onClick}>Award Item</button>
    </div>
  );
}

export default NFT;
