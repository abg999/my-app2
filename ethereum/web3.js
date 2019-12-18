import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);

let web3;//let keyword ensures we are able to reassign a variable
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
	// makes sure we are in the browser and metamask is running
	window.ethereum.enable();
	web3 = new Web3(window.web3.currentProvider);	
	} else {
	//We are on the server **OR** and the user is not running or using metamask
	const provider = new Web3.providers.HttpProvider(
	'https://rinkeby.infura.io/v3/1c45002f11c84ee5975a98b1cc4ea887'
	);
	web3 = new Web3(provider)



	}

export default web3;