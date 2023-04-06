import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

etherToWei();
// weiToEther();
// getBalance();


// 任意数量ether转换成wei
function etherToWei() {
    console.log(web3.utils.toWei("2"));
    console.log(web3.utils.toWei("2", "Gwei"));
}

// 任意数量wei转换成ether
function weiToEther() {
    console.log(web3.utils.fromWei("5000000000000000000"));
    console.log(web3.utils.fromWei("5000000000000000000", "Gwei"));
    
}

// 获取地址余额
function getBalance() {
    web3.eth.getBalance("0x057A16A940A8030A1adA52A756810d74F9dc7003").then(balance => {
        console.log(web3.utils.fromWei(balance));
    });
}

// 创建账户
function createAccount() {

}