import Web3 from "web3";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

// etherToWei();
// weiToEther();
// getBalance();
// createAccount();
// getNetworkId();
send();


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
    web3.eth.getBalance("0x1B1D307977BeFFFD36c1053369E0bBFb75598e39").then(balance => {
        console.log(web3.utils.fromWei(balance));
    });
}

// 创建账户
function createAccount() {
    var u = web3.eth.accounts.create("asdoloaqw");
    console.log(u);
    // 0x1B1D307977BeFFFD36c1053369E0bBFb75598e39
    // 0x4b244723673300ef0d1d7dbbe72d029d93380ca03c0d3455f9fb923d5559bc95
}

// 获取网络id
function getNetworkId() {
    web3.eth.net.getId().then(console.log); // 5777
}

// 发送已签名的交易
async function send() {
    const fromAddr = "0x057A16A940A8030A1adA52A756810d74F9dc7003";
    const fromPk = "0x05c584860a76edc4695f7c16173c74c5b5fca507016cad5530bc60b08cfc8555";
    const toAddr = "0x1B1D307977BeFFFD36c1053369E0bBFb75598e39";
    const value = web3.utils.toWei("3");

    // 查询账户交易次数
    const count = await web3.eth.getTransactionCount(fromAddr);
    
    // 构建交易
    const rawTx = {
        from: fromAddr,
        to: toAddr,
        value: value,
        common: {
            customChain: {
                networkId: 5777,
                chainId: 1337
            }
        }
    }

    // 预估交易花费 gas
    const gas = await web3.eth.estimateGas(rawTx);
    rawTx.gas = gas;

    // 签名交易
    const signRes = await web3.eth.accounts.signTransaction(rawTx, fromPk);

    // 发送交易
    const tx = web3.eth.sendSignedTransaction(signRes.rawTransaction);

    // 监听交易事件
    tx.on("transactionHash", (txId) => {
        console.log("交易发送成功, txId: ", txId);
    })
    tx.on("receipt", (res) => {
        console.log("receipt 交易被确认, res: ", res);
    })
    tx.on("confirmation", (number, res) => {
        console.log("confirmation 交易被确认, number: ", number, "res: ", res);
    })
}