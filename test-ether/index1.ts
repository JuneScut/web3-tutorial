import fetch from "node-fetch";

// We need to use async/await syntax in typescript,
// so we create a top-level async function.
// ignore this syntax if you don't understand
(async () => {
  const data = {
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: "1",
  };

  const url = "https://rpc.etdchain.net";
  const result = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonData = await result.json();
  console.log(jsonData);
})();
