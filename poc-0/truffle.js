const Wallet = require('ethereumjs-wallet');
const WalletProvider = require('truffle-wallet-provider');
const Web3 = require('web3');

if (!process.env.PRIVATE_KEY) {
  throw Error('No PRIVATE_KEY env defined');
}

const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');
const wallet = Wallet.fromPrivateKey(privateKey);
const provider = new WalletProvider(wallet, 'https://ropsten.infura.io/');

module.exports = {
  contracts_build_directory: `${__dirname}/client/assets/abi`,
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    test: {
      // gas: 4600000,
      privateKey,
      gasPrice: Web3.utils.toWei('20', 'gwei'),
      network_id: '3',
      provider,
    },
  },
};
