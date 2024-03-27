import Web3 from "web3";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const fromAddress = "0x6d39C88c8e25142147B9D4Ab414123DdeebF418b"; // Sender's address
const toAddress = "0x567b6a79Fccc7dBA3Ac21B5487c998f84A11C163"; // Recipient's address
const privateKey =
  "0xde2eab259f8417d0ab6cf8a6e859e638c595a50450d2b645595c4939cec40591"; // Sender's private key
//    0x6d40df9d6f7d8f7692cf55fffd15c4c5d2e33656612adb49544fb71a2945c9dd

const transferAmount = web3.utils.toWei("1", "ether"); // Amount to transfer in wei

const test = async () => {
  try {
    // get the sender's balance
    const balance = await web3.eth.getBalance(fromAddress);
    console.log("Sender's balance before transfer:", balance);
    const transaction = {
      from: fromAddress,
      to: toAddress,
      value: transferAmount,
      gasPrice: web3.utils.toHex(web3.utils.toWei("0.00002", "gwei")), // 20 Gwei in wei
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction || ""
    );
    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

const sendEther = async (
  fromAddress: string,
  toAddress: string,
  amount: number,
  privateKey: string
) => {
  try {
    // Get the current nonce for the fromAddress
    const nonce = await web3.eth.getTransactionCount(fromAddress);

    // Create the transaction object
    const txObject = {
      from: fromAddress,
      to: toAddress,
      value: web3.utils.toWei(amount.toString(), "ether"),
      gas: 21000, // Gas limit
      gasPrice: web3.utils.toWei("10", "gwei"), // Gas price
      nonce: nonce, // Nonce
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      txObject,
      privateKey
    );

    // Send the signed transaction
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction receipt:", txReceipt);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

export { test, sendEther };
