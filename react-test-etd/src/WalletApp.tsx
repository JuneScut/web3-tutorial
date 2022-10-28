import { ethers } from "ethers";
import React from "react";
import { useState, useCallback } from "react";

function WalletApp() {
  // create states
  const [text, setText] = React.useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const onClick = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const message = await signer.signMessage(text);
    setMessage(message);

    const result = await fetch(
      "https://functions.video2.trade/api/metamask/signIn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          signature: message,
          address: await signer.getAddress(),
        }),
      }
    );

    const data = await result.json();
    setToken(data.accessToken);
  }, [text]);

  return (
    <div>
      <div>
        <p>Signed Message: {message}</p>
        <p>Access token: {token}</p>
      </div>

      <label>Text to be signed </label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button style={{ marginLeft: 10 }} onClick={onClick}>
        Sign Message
      </button>
    </div>
  );
}

export default WalletApp;
