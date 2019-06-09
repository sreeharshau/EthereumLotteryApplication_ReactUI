import React, {Component} from "react";

class navBar extends Component {
	constructor(props){
		super(props);

		this.state={}
	}

	render(){
		return(
			<nav className="navbar navbar-dark bg-dark navbar-expand-md">
				<ul className="nav navbar-nav mr-auto">
					<li className="nav-item"> <button className="btn btn-dark" onClick={() => this.props.refreshContents("LotteryInfo")}> Lottery Statistics </button></li>
					<li className="nav-item"> <button className="btn btn-dark" onClick={() => this.props.refreshContents("NewRegistration")}> Register Now! </button></li>
					<li className="nav-item"> <button className="btn btn-dark" onClick={() => this.props.refreshContents("ManagerOperations")}> Manager Operations </button></li>
				</ul>
				<ul className="nav navbar-nav ml-auto">
				<span className="navbar-text"> Contract Manager: {this.props.managerAddress} </span>
				</ul>

			</nav>
		);
	}
}

export default navBar;