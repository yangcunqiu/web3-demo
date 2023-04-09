import Web3 from "web3";
import Test from "./contract/Test.json" assert { type: 'json' }

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

// 创建合约实例
const testContract = new web3.eth.Contract(Test.abi, "0x598c2CA18582c72fd70a6d355e48415b4a14b5fd");

// 调用方法 不修改状态变量
testContract.methods.a().call({from: "0x79Bd8A4f61D71329585FFddfAAF99163aAA32320"}).then((res) => {
    console.log("a: ", res);
})

testContract.methods.getSum(1, 4).call({from: "0x79Bd8A4f61D71329585FFddfAAF99163aAA32320"}).then((res) => {
    console.log("getSum: ", res);
})

testContract.methods.getAddr().call({from: "0x79Bd8A4f61D71329585FFddfAAF99163aAA32320"}).then((res) => {
    console.log(res);
    console.log(res[0]);
    console.log(res.addr);
    console.log(res[1]);
    console.log(res[2]);
})

// 修改状态变量
await testContract.methods.update("updated").send({from: "0x79Bd8A4f61D71329585FFddfAAF99163aAA32320"})
.on("transactionHash", (txHash) => {
    console.log(txHash);
})
.on('receipt', function(receipt){
    console.log(receipt);
});

testContract.methods.a().call({from: "0x79Bd8A4f61D71329585FFddfAAF99163aAA32320"}).then((res) => {
    console.log("a: ", res);
})
