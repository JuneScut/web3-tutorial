import { ethers, Wallet } from "ethers";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import "./style.css";

const ContractAddress = "0x939a26F6019A52AB943dC603e4699F5bBBdC1ac2";

function App() {
  // NFT info
  const [name, setName] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");

  useEffect(() => {
    // TODO: get from server
    setName("Nike Pegasus");
    setIntroduction(
      "Let the Nike Air Zoom Pegasus 39 PRM help you ascend to new heights, whether you're training or jogging, with its intuitive design. This version has a brightly colored exterior that announces your presence on the road. Time to fly."
    );
  }, []);

  const onClick = useCallback(async () => {
    // mint a new NFT
    // const tx = await contract.awardItem(
    //   ACCOUNT.ADDRESS,
    //   "https://developer.apple.com/augmented-reality/quick-look/models/cosmonaut/cosmonaut_2x.png"
    // );
    // await tx.wait();
  }, []);

  return (
    <div className="main">
      <h3 className="title">{name}</h3>
      <p>{introduction}</p>
      <div className="nft-model">
        <a
          rel="ar"
          href="https://developer.apple.com/ar/photogrammetry/PegasusTrail.usdz"
        >
          <img src="https://developer.apple.com/augmented-reality/quick-look/models/nike-pegasus/nike-pegasus_2x.png" />
        </a>
      </div>
      <div className="submit-btn">
        <a onClick={onClick} className="submit" data-title="Mint"></a>
      </div>
    </div>
  );
}

export default App;
