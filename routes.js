//***Note***
//whenever changes has to be performed in this file restaart server by npm run dev 
//*************

const routes = require('next-routes')();

routes
//2nd arg specifies which component from pages directory should be accessed when routed to 1st argument
	.add('campaigns/new','/campaigns/new')
	.add('/campaigns/:address','/campaigns/show')
	.add('/campaigns/:address/requests','/campaigns/requests/index')
	.add('/campaigns/:address/requests/new','/campaigns/requests/new');
module.exports = routes;
