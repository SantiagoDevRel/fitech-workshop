import { useEffect } from 'react';
import './App.css';
// import web3.js
import { Web3 } from "web3";

const ADDRESS = "0x294033486c4802452E410b3D008596B4190D9845"
const ABI = [
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function App() {

  // Initialize the Web3 object
  const web3fitech = new Web3(window.ethereum)

  // Initialize the contract
  const myContract = new web3fitech.eth.Contract(ABI,ADDRESS)

  // **READING FUNCTIONS**
  async function getBalance(){
    // fetch the balance of the contract
    console.log("fetching balance...")

    const balance = await myContract.methods.balance().call()

    console.log("Current balance is:",balance)

  }

  // WRITING FUNCTIONS
  async function connectWallet(){
    console.log("connecting...")

    const wallet = await web3fitech.eth.requestAccounts();

    console.log("wallet connected:", wallet)

    return wallet[0];
  }

  async function donate(){
    console.log("donating...")

    // from: the address that is sending the tx
    // value: 1 ether in this case
    const msgSender = await connectWallet()
    
    console.log("msg sender:",msgSender)

    const txReceipt = await myContract.methods.donate().send({ from: msgSender, value: "1000000000000000000"})

    console.log("tx receipt:", txReceipt)
  }

  async function withdraw(){
    console.log("withdrawing")

    const msgSender = await connectWallet()
    
    console.log("msg sender:",msgSender)

    const txReceipt = await myContract.methods.withdraw().send({from: msgSender})

    console.log("tx receipt:", txReceipt)
  }
  
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={connectWallet}>Connect wallet</button>
      <button onClick={donate}>Donate</button>
      <button onClick={withdraw}>Withdraw</button>
      <button onClick={getBalance}>Balance</button>
      </header>
    </div>
  );
}

export default App;
