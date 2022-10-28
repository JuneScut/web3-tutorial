import { ethers } from "ethers";

// We need to use async/await syntax in typescript,
// so we create a top-level async function.
// ignore this syntax if you don't understand
// private key: 8809ca26ec2926883a2a1d4bfda128d12b40ac0affea93fec099a6a078defe34
(async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.debugchain.net"
  );

  // we will get wallet from private key
  const wallet = new ethers.Wallet(
    "8809ca26ec2926883a2a1d4bfda128d12b40ac0affea93fec099a6a078defe34",
    provider
  );

  // put your receiver here
  const receiver = "0x3677D3c9c78650b442Ef30EDBa85df81f9206f57";

  // get total transaction count from sender as nonce
  const nonce = await provider.getTransactionCount(wallet.address);

  // sign transaction
  const signedTransaction = await wallet.signTransaction({
    to: receiver,
    value: ethers.utils.parseEther("0.1"),
    nonce: nonce,
    gasPrice: await provider.getGasPrice(),
    gasLimit: 21000,
    chainId: 8348,
  });

  console.log("Signed transaction", signedTransaction);

  const txId = await provider.sendTransaction(signedTransaction);
  console.log("Transaction id", txId);

  // getting block number
  // console.log("Current block number", await provider.getBlockNumber());

  // getting latest block
  console.log("Latest block", await provider.getBlock("latest"));

  // getting transaction by hash
  // console.log(
  //   "Transaction",
  //   await provider.getTransaction(
  //     "0x28c3d9fdf6af81ff168516a5e59a2e7011e4378f1887a25a6a486d51a862ffb9"
  //   )
  // );

  // getting transaction count
  // console.log(
  //   "Total number of transactions by wallet address",
  //   await provider.getTransactionCount(
  //     "0x8ee101a5331720c0535d8ba65ba60da9d7b932ee"
  //   )
  // );

  // getting user's balance
  // const balance = await provider.getBalance(
  //   "0x8ee101a5331720c0535d8ba65ba60da9d7b932ee"
  // );
  // console.log("Balance in wei", balance);
  // const balanceInEther = ethers.utils.formatEther(balance);
  // console.log("Balance in ether", balanceInEther);
})();
