import Web3 from "web3";
import Test from "./contract/TestEvent.json" assert { type: 'json' }

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

// 创建合约实例
const testContract = new web3.eth.Contract(Test.abi, "0x87982A1aC37E9b28C50d3284764BDcC9833B5A23");

// 实时监听事件
testContract.events.Log()
.on("connected", (subscribeId) => {
    console.log("connected: ", subscribeId);
})
.on("data", (data) => {
    console.log("data: ", data);
})

// 读取合约历史事件
testContract.getPastEvents("Log").then((events) => {
    console.log("getPastEvents", events);
});