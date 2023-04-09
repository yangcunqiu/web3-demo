import Web3 from "web3";
import Test from "./contract/TestTransfer.json" assert { type: 'json' }

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

// 创建合约实例
const testContract = new web3.eth.Contract(Test.abi, "0x28Af27aBfe69d2748FE2357ba7B1D68f3c151C2c");

// 监听事件
testContract.events.BalanceLog()
.on("data", (data) => {
    console.log("BalanceLog: ", data);
})

// 查询余额
web3.eth.getBalance("0x28Af27aBfe69d2748FE2357ba7B1D68f3c151C2c").then(balance => {
    console.log(web3.utils.fromWei(balance));
});

// 转账
await testContract.methods.trans().send({
    from: "0x1d00a53cc3Dacd456C2556D93D4Ce48D05540439",
    value: web3.utils.toWei("5")
})

// 再次查询余额
web3.eth.getBalance("0x28Af27aBfe69d2748FE2357ba7B1D68f3c151C2c").then(balance => {
    console.log(web3.utils.fromWei(balance));
});