const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');



const provider = new HDWalletProvider(
	"absent napkin street debris case alone swear disagree enable crew near wrap",
	"https://rinkeby.infura.io/v3/1c45002f11c84ee5975a98b1cc4ea887");

const web3  = new Web3(provider)

web3.setProvider(provider)



const deploy = async()=>{
	const account = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account',account[0]);

	        //     const result = await new web3.eth.Contract(JSON.parse(interface))
         // .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
         // .send({from: account[0],gas: '0x520844', gasPrice: '0x4A817C8000'}); // remove 'gas'

          const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
         .deploy({data: '0x' + compiledFactory.bytecode }) // add 0x bytecode
         .send({from: account[0],gas: '1000000'}); // remove 'gas'


	console.log('contract deployed to',result.options.address);
};
deploy();


// Contract deployed to address 0xA2242A095202e802b658D5fFE8f474f95AFe3461
