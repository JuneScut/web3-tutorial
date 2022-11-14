import { ethers, Wallet } from "ethers";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";

const ACCOUNT = {
  PK: "",
  ADDRESS: "",
};

const ContractAddress = "0x939a26F6019A52AB943dC603e4699F5bBBdC1ac2";

function NFT() {
  // create states
  const [name, setName] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");

  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  const [signer, setSinger] = useState<Wallet | null>();

  useEffect(() => {
    // get from server
    setName("Nike Pegasus");
    setIntroduction(
      "Let the Nike Air Zoom Pegasus 39 PRM help you ascend to new heights, whether you're training or jogging, with its intuitive design. With lightweight upper and ideal to wear in any season, it has a supportive sensation to help keep your feet contained, while underfoot cushioning and double Zoom Air units (1 more than the Peg 38) give you an extra pop to your step. This version has a brightly colored exterior that announces your presence on the road. Time to fly."
    );
    // get provider and signer
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const wallet = new ethers.Wallet(ACCOUNT.PK, provider);
    setSinger(wallet);
    setLoading(true);
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
