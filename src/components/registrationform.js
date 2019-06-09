import React, {Component} from 'react';

class RegForm extends Component{
	constructor(props){
		super(props);

		var spinnerDisplay = (
				<div className="spinner-border" role="status">
  					<span className="sr-only">Loading...</span>
				</div>
		);

		this.state = {"registerValue":0, onSubmit: props.onSubmit, currChanceFunc: props.currChanceFunc, currChanceContent:"", spinnerContent:"", spinnerDisplay: spinnerDisplay};
		}

	onInputChange(event){
		this.setState({"registerValue": event.target.value});
	}

	async onSubmitRegForm(event){
		event.preventDefault();

		// Design choice to keep this logic in the front-end rather than the back-end to save computations on the blockchain
		// Condition enforced on the back-end contract too in case this UI is not used
		if(((this.state.registerValue * 10) % 1 === 0) && (this.state.registerValue > 0.1)){	
			this.setState({spinnerContent: this.state.spinnerDisplay});
			await this.state.onSubmit(this.state.registerValue);
			this.setState({spinnerContent: ""})
		}
		else
			alert("Please ensure that the contribution amount is greater than 0.1 ether and is in denominations of 0.1 ether.")
	}

	async componentDidMount(){
		var returnData = await this.state.currChanceFunc();

		var accountNumber = returnData["Account"].slice(0,6) + "..." + returnData["Account"].slice(-4,);
		var currChancePct = 0;
		
		if(returnData["Chances"] !== 0)
			currChancePct = returnData["Chances"].toFixed(2);
		
		var currContributionEther = returnData["Ether"];

		var currChanceContent = (
			<div>
				<table className="table table-light table-hover">
					<thead className="thead-dark" style={{"textAlign":"center"}}>
						<tr>
							<th> Your Account Number </th>
							<th> Current Win Chance </th>
							<th> Total Ether Contribution </th>
						</tr>
					</thead>
					<tbody style={{"textAlign":"center", "fontWeight":"bold"}}>
						<tr key="CurrChanceTable_Row0">
							<td> {accountNumber} </td>
							<td>{currChancePct}%</td>
							<td>{currContributionEther.toFixed(2)} Ether</td>
						</tr>
					</tbody>
				</table>
			</div>
			);

		this.setState({currChanceContent});

	}

	render(){
		return(
			<div>
				<h2 style={{"textAlign": "center", "marginTop" : "10px"}}> Looking to enter the lottery / improve your chances? </h2>
				  	<div className="registrationInfoDiv col-md-5">
		          		<dl> 
			          		<dt className="lead" style={{"backgroundColor": "#343a40", "color":"white", "borderRadius": "10px", "textAlign":"center"}}> Important Information! </dt>
				          		<dt style={{"marginTop":"5px"}}> New Members </dt>
				          		<dl style={{"padding":"10px"}}> Use the box to enter an amount <strong> in Ether </strong> which you would like to contribute to the lottery. Please note that your winning chances increase with your contributions. </dl>
			          		<dt> Registered Members </dt>
				          		<dl style={{"padding":"10px"}}> Contribute additional ether to increase your chances of winning! </dl>
			          			<dl style={{"backgroundColor":"#3366cc", "color":"white", "textAlign":"center", "borderRadius":"10px"}}> Please note that the amount has to be a minimum of 0.2 ether and in denominations of 0.1 ether </dl>
			          	</dl>
		          	</div>
		        <div className="regForm_SideContainer col-md-5">
		          	<div className="regForm_currentChanceDisplay">
		            		{this.state.currChanceContent}
		            </div>
		            <div className="regForm_inputBoxContainer">
			            <form className="form-group row" onSubmit={event => this.onSubmitRegForm(event)}>
				            <div style={{"marginTop":"5%"}}>
				              	<label htmlFor="etherAmountBox" style={{"fontWeight":"bold"}}>Amount in Ether</label>
				                <div className="input-group">
					                <input id="etherAmountBox" className="form-control" value={this.state.registerValue} onChange={event => this.onInputChange(event)} />
					                	<div className="input-group-btn" style={{"marginLeft":"5px"}}>
					                		<button className="btn btn-dark"> Register for Lottery</button>
					                	</div>
					            </div>
				            </div>
			            </form>
		           	</div>
			        <div className="spinnerContainer">
			        	{this.state.spinnerContent}
			        </div>
		        </div>
	        </div>
		);
	}
}

export default RegForm;