import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign  from '../../../ethereum/dynamicCampaignInteraction';
import RequestRow from '../../../components/RequestRow';




class RequestIndex extends Component{
	static async getInitialProps(props){
		const { address } = props.query;
		const campaign = Campaign(address);
		const requestCount = +await campaign.methods.getRequestCount().call();
		//+ will convert count from getRequestCount() of contract to integer from string
		const approversCount = await campaign.methods.approversCount().call()

		const requests =  await Promise.all(
			Array(requestCount)
				.fill()//fill will give indices of an array based on its length like it=f array is 2 it will give 0 and 1
				.map((element, index) => {
				return campaign.methods.requests(index).call()
			})
			);

		return { address,requests, requestCount, approversCount }
	}


	renderRows(){
		return this.props.requests.map((request, index)=>{
			return( 
				<RequestRow
					key = {index}//part of react it wants us to pass in akey whenever passing list of components
					id={index}
					request={request}
					address={this.props.address}
					approversCount={ this.props.approversCount }
				/>
			);
		});
	}



	render(){

		const { Header, Row, HeaderCell, Body }=Table;

		//we will iterate list of request and for every request we will return a new RequestRow

		return(
			<Layout>
				<h3>Requests</h3>
				<Link route={`/campaigns/${this.props.address}/requests/new`}>
					<a>
						<Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
					</a>
				</Link>
				<Table>
					<Header>
						<Row>
							<HeaderCell>Id</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount</HeaderCell>
							<HeaderCell>Recipient</HeaderCell>
							<HeaderCell>Approval Count</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
							<HeaderCell>Finalize</HeaderCell>
						</Row>
					</Header>
				<Body>{/* it is from Table component */}
					{this.renderRows()}
				</Body>
			</Table>
			<div>Found {this.props.requestCount} requests.</div>
			</Layout>

		);
	}
}

export default RequestIndex