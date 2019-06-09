// import HDWalletProvider from 'truffle-hdwallet-provider';
// import accountMnemonic from './mnemonicPhrase.js';

import Web3 from 'web3';


// This is assuming the user has Metamask exists and we are hijacking its copy of Web3 with all the keys. NOT ALWAYS TRUE!! Deal with that later

const getProvider = async() => {
	await window.web3.currentProvider.enable();
};
getProvider();

const web3 = new Web3(window.web3.currentProvider);

// Send this out for use by other modules
export default web3;
