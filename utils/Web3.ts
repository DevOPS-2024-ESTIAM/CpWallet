import Web3 from "web3";

let web3: Web3 | undefined;

const SimpleStorageContractABI = [
  {
    constant: false,
    inputs: [
      {
        name: "x",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "get",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export const connectWalletByMetamask = async (): Promise<string> => {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3Instance = new Web3(window.ethereum);
      const [defaultAccount] = await web3Instance.eth.getAccounts();
      return defaultAccount;
    } else {
      throw new Error("Metamask not installed");
    }
  } catch (error: any) {
    throw new Error(`Error connecting wallet: ${error.message}`);
  }
};

export const initializeWeb3 = async (): Promise<Web3> => {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  return web3;
};

export const connectToExistingAccount = async (
  address: string,
  myPassword: string,
  mnemonic: string
): Promise<{ address: string; privateKey: any }> => {
  try {
    const web3Instance = await initializeWeb3();
    const accounts = await web3Instance.eth.getAccounts();
    const account = accounts.find(
      (acc) => acc.toLowerCase() === address.toLowerCase()
    );

    if (!account) {
      throw new Error("Account not found");
    }
    const wallet = web3Instance.eth.wallet?.decrypt(mnemonic, myPassword)
    // const hdwallet = require("ethereumjs-wallet").hdkey.fromMasterSeed(
    //   web3Instance.utils.toHex(myPassword)
    // );
    // const wallet = hdwallet
    //   .derivePath(`m/44'/60'/0'/0/${accounts.indexOf(account)}`)
    //   .getWallet();
    // const privateKey = "0x" + wallet.getPrivateKey().toString("hex");

    console.log(`Connected to account: ${wallet}`);
    return { address: account, privateKey: wallet };
    
  } catch (error: any) {
    throw new Error(`Error connecting to existing account: ${error.message}`);
  }
};

export const getAccounts = async (): Promise<string[]> => {
  try {
    const web3Instance = await initializeWeb3();
    return await web3Instance.eth.getAccounts();
  } catch (error: any) {
    throw new Error(`Error getting accounts: ${error.message}`);
  }
};

export const createAccount = async (): Promise<{
  address: string;
  privateKey: string;
}> => {
  try {
    const web3Instance = await initializeWeb3();

    // Create a new account
    const newAccount = web3Instance.eth.accounts.create();
    // Import the new account into Ganache
    const password = "test123"; // Choose a password to encrypt the private key
    // await web3Instance.eth.accounts.encrypt(newAccount.privateKey, password)
    await newAccount.encrypt(password)
  
    console.log("New account imported successfully to Ganache:");
    console.log("new Account: ", newAccount);
    sendEther(newAccount.address, 1); // Send Ether to the new account

    return { address: newAccount.address, privateKey: newAccount.privateKey };
  } catch (error: any) {
    throw new Error(
      `Error creating and pushing account to Ganache: ${error.message}`
    );
  }
};

export const getAccountBalance = async (address: string): Promise<string> => {
  try {
    const web3Instance = await initializeWeb3();
    const balance = await web3Instance.eth.getBalance(address);
    return web3Instance.utils.fromWei(balance, "ether");
  } catch (error: any) {
    throw new Error(`Error getting account balance: ${error.message}`);
  }
};

const sendEther = async (receiverAddress: string, amountInEther: number) => {
  try {
    const web3Instance = await initializeWeb3();

    // Convert Ether to Wei (1 Ether = 10^18 Wei)
    const amountInWei = web3Instance.utils.toWei(
      amountInEther.toString(),
      "ether"
    );

    // Send Ether transaction
    const accounts = await web3Instance.eth.getAccounts();
    const senderAddress = accounts[0]; // Assuming the first account is the sender
    const transactionReceipt = await web3Instance.eth.sendTransaction({
      from: senderAddress,
      to: receiverAddress,
      value: amountInWei,
    });

    console.log("Ether sent successfully to", receiverAddress);
    console.log("Transaction hash:", transactionReceipt.transactionHash);
  } catch (error) {
    console.error("Error sending Ether:", error);
  }
};

// this method involve smart contract

// export const sendTransaction = async (
//   from: string,
//   to: string,
//   value: string
// ): Promise<any> => {
//   try {
//     const web3Instance = await initializeWeb3();
//     const contract = new web3Instance.eth.Contract(
//       SimpleStorageContractABI,
//       to
//     );
//     const transaction = {
//       from,
//       to,
//       value: web3Instance.utils.toWei(value, "ether"),
//     };
//     const gas = await web3Instance.eth.estimateGas(transaction);
//     console.log(`Estimated gas: ${gas}`);
//     const options = {
//       from,
//       to,
//       value: web3Instance.utils.toWei(value, "ether"),
//       gas: gas.toString(),
//     };
//     const receipt = await contract.methods.set(options).send(options);
//     console.log(`Transaction receipt: ${receipt}`);
//     return { options, receipt };
//   } catch (error: any) {
//     throw new Error(`Error sending transaction: ${error.message}`);
//   }
// };

// this method does not involve smart contract
export async function sendTransaction(
  senderAddress: string,
  senderPrivateKey: string,
  recipientAddress: string,
  value: number
) {
  const web3Instance = await initializeWeb3();

  // Build the transaction object
  const txObject = {
    from: senderAddress,
    to: recipientAddress,
    value: web3Instance.utils.toWei(value.toString(), "ether"), // Convert value to wei
    gas: getGasPrice(), // Adjust gas limit as needed
    gasPrice: getGasPrice(), // Get the current gas price
  };
  console.log("Transaction object:", txObject);

  try {
    // Sign the transaction
    const signedTx = await web3Instance.eth.accounts.signTransaction(
      txObject,
      senderPrivateKey
    );

    // Send the signed transaction
    const receipt = await web3Instance.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction receipt:", receipt);
  } catch (error: any) {
    console.error("Error making transaction:", error);
    throw new Error(`Error making transaction: ${error.message}`);
  }
}
export const checkTransactionStatus = async (hash: string): Promise<any> => {
  try {
    let receipt: any = null;
    console.log("Checking transaction status started...");
    while (!receipt) {
      console.log("Checking transaction status in progress...");
      const web3Instance = await initializeWeb3();
      receipt = await web3Instance.eth.getTransactionReceipt(hash);
      if (!receipt) {
        console.log(
          "Transaction is not yet mined. Checking again in 5 seconds..."
        );
        await delay(5000); // Wait for 5 seconds before checking again
      }
    }
    console.log("Transaction mined. Receipt:", receipt);
    return receipt;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    throw error
  }
};

export const getBlock = async (hash: string): Promise<any> => {
  try {
    const web3Instance = await initializeWeb3();
    return await web3Instance.eth.getBlock(hash);
  } catch (error: any) {
    throw new Error(`Error getting block: ${error.message}`);
  }
};

export const getBlockNumber = async (): Promise<bigint> => {
  try {
    const web3Instance = await initializeWeb3();
    return await web3Instance.eth.getBlockNumber();
  } catch (error: any) {
    throw new Error(`Error getting block number: ${error.message}`);
  }
};

export const getBlockByNumber = async (number: bigint): Promise<any> => {
  try {
    const web3Instance = await initializeWeb3();
    return await web3Instance.eth.getBlock(number.toString());
  } catch (error: any) {
    throw new Error(`Error getting block by number: ${error.message}`);
  }
};

export const getTransactionReceipt = async (hash: string): Promise<any> => {
  try {
    const web3Instance = await initializeWeb3();
    return await web3Instance.eth.getTransactionReceipt(hash);
  } catch (error: any) {
    throw new Error(`Error getting transaction receipt: ${error.message}`);
  }
};

export const getGasPrice = async (): Promise<string> => {
  try {
    const web3Instance = await initializeWeb3();
    const gasPrice = await web3Instance.eth.getGasPrice();
    return web3Instance.utils.fromWei(gasPrice, "gwei");
  } catch (error: any) {
    throw new Error(`Error getting gas price: ${error.message}`);
  }
};

export const estimateGas = async (
  from: string,
  to: string,
  value: string
): Promise<string> => {
  try {
    const web3Instance = await initializeWeb3();
    const transaction = {
      from,
      to,
      value: web3Instance.utils.toWei(value, "ether"),
    };
    const gas = await web3Instance.eth.estimateGas(transaction);
    return gas.toString();
  } catch (error: any) {
    throw new Error(`Error estimating gas: ${error.message}`);
  }
};

export const getNetworkId = async (): Promise<number> => {
  try {
    const web3Instance = await initializeWeb3();
    return Number(await web3Instance.eth.net.getId());
  } catch (error: any) {
    throw new Error(`Error getting network ID: ${error.message}`);
  }
};

export const getNetworkType = async (): Promise<string> => {
  try {
    const web3Instance = await initializeWeb3();
    const networkId = Number(await web3Instance.eth.net.getId());
    const networkMap: { [key: number]: string } = {
      1: "Mainnet",
      3: "Ropsten",
      4: "Rinkeby",
      5: "Goerli",
      42: "Kovan",
    };
    return networkMap[networkId] || "Unknown";
  } catch (error: any) {
    throw new Error(`Error getting network type: ${error.message}`);
  }
};

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Web3Utils = {
  connectWalletByMetamask,
  initializeWeb3,
  connectToExistingAccount,
  getAccounts,
  createAccount,
  getAccountBalance,
  sendTransaction,
  getBlock,
  getBlockNumber,
  getBlockByNumber,
  getTransactionReceipt,
  getGasPrice,
  estimateGas,
  getNetworkId,
  getNetworkType,
  checkTransactionStatus,
  sendEther,
};

export default Web3Utils;
