import Web3 from "web3";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

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
    web3.eth.getBalance("0x79Bd8A4f61D71329585FFddfAAF99163aAA32320").then(balance => {
        console.log(web3.utils.fromWei(balance));
    });
}

// 创建账户
function createAccount() {
    var u = web3.eth.accounts.create("asdoloaqw");
    console.log(u);
    // 0xC36a263721373eC59430A959d1D6366E36aFA52b
    // 0xca957d44b87b1d7b0fae531b83a26e2d513f640cbd28bfe63524db128f8fff4d
}

// 获取网络id
function getNetworkId() {
    web3.eth.net.getId().then(console.log); // 5777
}

// 发送已签名的交易
async function send() {
    const fromAddr = "0x79Bd8A4f61D71329585FFddfAAF99163aAA32320";
    const fromPk = "0xcdda033f8cf946fae7d7c54145714ffad1d20ea86f904493a75798294936281a";
    const toAddr = "0x28Af27aBfe69d2748FE2357ba7B1D68f3c151C2c";
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