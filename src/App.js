import React, {Component} from 'react';
import './App.css';

import ethereum_icon from "./img/ethereum_icon.png"
import appLogo from "./img/diceBlackIcon.jpg"

import web3 from './web3Config.js';
import {VictoryTheme, VictoryLabel,  VictoryPie} from 'victory';

import NavBar from "./components/navbar";
import LeaderBoard from "./components/leaderboard";
import RegForm from "./components/registrationform.js";
import lottery from './lottery.js';


class App extends Component {

  // This variable below is equivalent to the entire construction declaration commented out below it
  state = {
    managerAddress:'',
    registeredMembers:[],
    currBalance:'',
    registerValue:'',
    fetchedAccounts:[],
    contentSection:'',
  };

  // constructor(props){
  //   super(props);

  //   this.state = {managerAddress: ''};
  // }

  detectAccountChange = async () => {
    const fetchedAccounts = await web3.eth.getAccounts();
      if(fetchedAccounts[0] !== this.state.fetchedAccounts[0])
        window.location.reload(true);
  }

  async componentDidMount(){

    const fetchedAccounts = await web3.eth.getAccounts();
  
    const managerAddress = await lottery.methods.managerAddress().call();
    let registeredMembers = await lottery.methods.returnRegisteredMembers().call();

    let currBalance = await web3.eth.getBalance(lottery.options.address)

    currBalance = web3.utils.fromWei(currBalance, "ether");

    
    this.setState({fetchedAccounts, managerAddress, registeredMembers, currBalance});

    this.refreshContents("LotteryInfo");

    window.setInterval(this.detectAccountChange, 300);

  }

  onSubmit = async (valueForRegistration) => {

    await lottery.methods.registerForLottery().send({from: this.state.fetchedAccounts[0], value: web3.utils.toWei(valueForRegistration, "ether")});

    alert('Transaction completed successfully! You have been entered into the lottery.');

    window.location.reload(true);
  }

  pickWinner = async(event) => {
    event.preventDefault();

    await lottery.methods.pickLotteryWinner().send({from:this.state.fetchedAccounts[0]});
    const winningAddress = await lottery.methods.previousLotteryWinner().call();


    alert("The winner of the current round is:",winningAddress);
    window.location.reload(true);
  }

  getCurrChance = async() => {
    var fetchedAccounts = await web3.eth.getAccounts();

    var returnedData = await lottery.methods.getCurrentWinningChances().call({from:fetchedAccounts[0]})
    var currChancePct = 0;
    var currentContribution = 0;

    if(returnedData[0] !== "0" && returnedData[1] !== "0"){
      currChancePct = (returnedData[0]/returnedData[1])*100;
      currentContribution = returnedData[0] * 0.1;
    }

    return {"Account": fetchedAccounts[0], "Chances":currChancePct, "Ether":currentContribution};

  }

 
  refreshContents = async(refreshValue) => {
    if(refreshValue === "LotteryInfo")
      this.refreshContents_LotteryInfo();
    else if(refreshValue === "NewRegistration")
      this.refreshContents_NewRegistration();
    else if(refreshValue === "ManagerOperations")
      this.refreshContents_ManagerOperations();
  }


  refreshContents_LotteryInfo = async() => {
    
    var returnedData = await lottery.methods.getAllWinningChances().call();
    var addressList = returnedData[0];
    var winChances = returnedData[1];
    var dataConcat = [];
    var totalChances = 0;
    var colorScale = ["#70060e","#982f13","#bf5413",'#e17b0d','#ffa600']
    
    if(addressList !== undefined){
      for(var i = 0; i < winChances.length ; i++){
        totalChances += Number(winChances[i]);
        addressList[i] = addressList[i].slice(0,6) + "..." + addressList[i].slice(-4,)
      }

      for(i = 0; i < addressList.length ; i++){
        var currChancePct = (winChances[i]/totalChances)*100;
        dataConcat.push({account:addressList[i], contribution:winChances[i], chances: currChancePct});
      }
    }

    const returnDiv = (
      <div>
          <div className="pieChartContainer col-md-4" >
              <h5 style={{"backgroundColor": "#343a40", "padding":"10px", "borderRadius":"10px", "marginTop" : "10px"}}> Current Chances of Winning ! </h5>
              <VictoryPie data={dataConcat} theme={VictoryTheme.material} colorScale={colorScale} x="account" y="chances"
                innerRadius={80}
                labelComponent={<VictoryLabel style={{"fontSize":"6px", "fill":"white"}} />}
               />
               <h6> Registered Lottery Members : {this.state.registeredMembers.length} </h6>
          </div>
          <div className="lotteryLeaderboard col-md-6">
            <h5 style={{"backgroundColor": "#343a40", "padding":"10px", "borderRadius":"10px", "marginTop" : "10px", "textAlign" : "center"}}> Lottery Leaderboard </h5>
            <ul id="lotteryLeaderList" className="list-group">
              <LeaderBoard dataForBoard={dataConcat} />
            </ul>
          </div>
       </div>
      );
    this.setState({contentSection :returnDiv});
    // console.log("State at end of refresh_LotteryInfo:", this.state);
  }

  refreshContents_NewRegistration = async() => {
    const newContents = <RegForm onSubmit={this.onSubmit} currChanceFunc={this.getCurrChance} />;
    this.setState({contentSection : newContents});
  }

  refreshContents_ManagerOperations = async() => {
    
    let ManagerSection = null;

    let fetchedAccounts = await web3.eth.getAccounts();

    if (fetchedAccounts[0] === this.state.managerAddress){
        ManagerSection = () => {
            return (
                <div className="managerSection col-md-6">
                <h5 style={{"textAlign":"center"}}> Welcome back, {fetchedAccounts[0].slice(0,6) + "..." + fetchedAccounts[0].slice(-4,)}!</h5>
                  <div className="managerSection_pickWinnerDiv">
                    <label> <strong> Pick Lottery Winner: </strong> </label>
                    <button style={{"marginLeft":"10px"}} className="btn btn-dark" onClick={this.pickWinner}> Pick a winner! </button>
                  </div>
                </div>
            );
        };
      }
      else{
        ManagerSection = () => {
          return(
            <div className="managerSection col-md-6">
              <h4> This section will only be enabled for the manager. Sorry! </h4>
            </div>
          );
        }
      }

    const newContents = (
      <div id="managerControlDiv">
        <ManagerSection />               
      </div>
      );
    this.setState({contentSection : newContents});

  }
  


  render(){
      
      return (
       <div className="mainOuterDiv">
           <div className="titleSection">
                <div className="titleContainerDiv" style={{'fontSize': 'small'}}>
                  <img id="diceOnBlackImage" src={appLogo} alt="App Logo Dice" />
                  <h2> The Crypto-Lottery </h2>
                  <span style={{'verticalAlign': 'middle'}}>
                      <h5> Powered by Ethereum <img className="ethereumIcon" src={ethereum_icon} alt="Ethereum Logo" /> </h5>   
                  </span>        
                </div>
           </div>

           <NavBar managerAddress={this.state.managerAddress} refreshContents={this.refreshContents} />

           <div id="contentSection" className="contentSection">          
               {this.state.contentSection}
                           
          </div>
      </div>
      );
  }
}

export default App;
