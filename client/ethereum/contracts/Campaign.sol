pragma solidity ^0.4.17;//will set compiler to this version so that even  changes in compiler does not break the old code


// approvals who vote for requests
//approvers are who already paid money for the request


contract CampaignFactory{
	
	address[] public deployedCampaigns;
	
	function createCampaign(uint minimum ) public {
		address newCampaign =  new Campaign(minimum, msg.sender);
		deployedCampaigns.push(newCampaign);
		
	}
	function getDeployedCampaigns()public view returns(address[]){
		return deployedCampaigns;
	}
	
}



contract Campaign{
	struct Request { //does not create instance of a struct it just creates a type
		string description;
		uint value;
		address recipient;
		bool complete;
		uint approvalCount;
		mapping (address => bool) approvals ;
		
	}
	
	Request[] public requests; 
	address public  manager;//manager info should be public to figure out who the manager is
	
	uint public minimumContribution;
	
	mapping(address => bool)public approvers;
	uint public approversCount;

	modifier restricted(){//modifier wherever used will run mentioned line of code in it used to avoid code repetion
		
		require(msg.sender == manager);//checks if current address is of manager
		
		_;
	}
	
	function Campaign(uint minimum,address creator) public{ //A campaign will be created by manager 
		
		manager = creator;//msg.sender gives public address of his/her wallet
		
		minimumContribution = minimum;//minimum contribution that campaign needs for successfully completing project
	}

	function contribute() public payable{//when a intrested person want to contribute to his/her desired proj(mostlly we will not use it as we will try to implement some 3rd party payment api like stripe or paypal)
		
		require(msg.value > minimumContribution);//checks for minimum contribution amount if true then only further lines of this code will be executed 
		
		approvers[msg.sender] = true;//mapping will store true for person who sent amount
		
		approversCount++;
	}
	
	//following function will be used to create new request of campaign creator
	function createRequest(string description, uint value, address recipient)  //values to this function will be passed using parameters 
		
		public restricted {
			Request memory  newRequest  =  Request({
			   description: description, 
			   value: value,
			   recipient: recipient,
			   complete: false,
			   approvalCount: 0//all value types should only be initialized therefore mapping is not initialized here
			});
			requests.push(newRequest);//will push request
	}
	
	function approveRequest(uint index)public{
		Request storage request = requests[index];
		
		require(approvers[msg.sender]);
		require(!request.approvals[msg.sender]);
		
		request.approvals[msg.sender]=true;
		request.approvalCount++;
		
	}   
	function finalizeRequest(uint index) public payable restricted{
		Request storage request = requests[index];
		
		require(request.approvalCount > (approversCount/2));
		require(!request.complete);
		
		request.recipient.transfer(request.value);
		request.complete = true;
		
	}

	function getSummary()public view returns (
		uint, uint, uint, uint, address
		){
		return(
			minimumContribution,
			this.balance,
			requests.length,
			approversCount,
			manager

		);
	}

	function getRequestCount()public view returns(uint){
		return requests.length;
	}
}