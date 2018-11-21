import * as Web3 from 'web3';

const { abi } = require('assets/abi/RFT.json');

export default (__, inject) => {
  const web3 = new Web3(window.web3.currentProvider);
  inject('rftContract', new web3.eth.Contract(abi));
};
