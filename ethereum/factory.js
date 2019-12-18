import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance  = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0xA2242A095202e802b658D5fFE8f474f95AFe3461'
);

export default instance;
