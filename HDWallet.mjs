import bip39 from "bip39"
import wallet from "ethereumjs-wallet";
import util from "ethereumjs-util";
const hdkey = wallet.hdkey;
import Web3 from "web3";

// 生成助记词
// const mnemonic = bip39.generateMnemonic();
const mnemonic = "short insect pulp need evolve innocent lens surround thrive portion drip furnace";
console.log("mnemonic: ", mnemonic);

// 生成随机种子
const seed = await bip39.mnemonicToSeed(mnemonic, "password123");
console.log("seed: ", seed.toString("hex"));

// 种子生成钱包
const hdwallet = hdkey.fromMasterSeed(seed);
console.log("hdwallet: ", hdwallet);

// 生成账户
function createAccount() {
    for (let index = 0; index < 2; index++) {
        console.log("第", index, "个用户")
        // 定义分层路径
        const account = hdwallet.derivePath("m/44'/60'/0'/0/" + index);
        // 获取私钥
        const privateKey = util.bufferToHex(account._hdkey._privateKey);
        console.log("account privateKey: ", privateKey);
        // 获取公钥
        const publicKey = util.bufferToHex(account._hdkey._publicKey);
        console.log("account publicKey: ", publicKey);
        // 获取地址
        const address = util.pubToAddress(account._hdkey._publicKey, true);
        console.log("account address: ", util.bufferToHex(address));
        console.log("account checksumAddress: ", util.toChecksumAddress(util.bufferToHex(address)));
    }
}

createAccount();



