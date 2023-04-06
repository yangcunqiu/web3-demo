import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

web3.eth.getBalance("0x057A16A940A8030A1adA52A756810d74F9dc7003")
.then(console.log);