import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import dynamicCampaignInteraction from '../ethereum/dynamicCampaignInteraction'
import web3 from '../ethereum/web3';
import { Router } from '../routes'; 


class ContributeForm extends Component{

	state ={
		value: '',
		errorMessage:'',
		loading: false
	};

	onSubmit = async (event) => {
		event.preventDefault();
		const campaign = dynamicCampaignInteraction(this.props.address); //from show.js passed as an argument when contibuteForm is called

		this.setState({loading:true,errorMessage:''});

		try{
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.contribute().send({
				from:accounts[0],
				value:web3.utils.toWei(this.state.value,'ether')
			});

			Router.replaceRoute(`/campaigns/${this.props.address}`)//will replace current route again with same route and refresh the page 

		}catch(err){
			this.setState({ errorMessage: err.message });

		}

		this.setState({loading:false,value:''});
	};
	render(){
		return(
			// we are not calling onSubmit during render time therefore no parenthesis
			<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
				<Form.Field>
					<label>Amount to Contribute</label>
					<Input
						value={this.state.value}
						onChange={event=>this.setState({ value:event.target.value })}
						label="ether"
						labelPosition="right" 
					/>
				</Form.Field>
				<Message error header="oops!" content={this.state.errorMessage}/>
				<Button primary loading={this.state.loading}>
					Contribute!
				</Button>
			</Form>
		);
	}
}

export default ContributeForm