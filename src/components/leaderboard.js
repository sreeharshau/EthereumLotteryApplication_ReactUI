import React, {Component} from 'react';

class LeaderBoard extends Component{
	constructor(props){
		super(props);

		this.state = {data: props.dataForBoard}
	}

	render(){
		var winningData = this.state.data;

	    if(winningData === undefined)
	    	return;

	    var chancesSorted = winningData.sort(function(a, b) {
	      return b.chances - a.chances;
	    });

	    chancesSorted = chancesSorted.slice(0,5);
	    var tableRows = [];   

	    if(chancesSorted.length > 0){
	    	for(var i = 0; i < chancesSorted.length; i++){
				tableRows.push(
					<tr key={"LeaderBoard_Elem_" + i}> 
						<td> {chancesSorted[i].account} </td>
						<td> {chancesSorted[i].chances.toFixed(2)}% </td>
						<td> {(chancesSorted[i].contribution * 0.1).toFixed(2) } ether </td>
					</tr>
				); 
			}
	    }

	    var returnContents = (
	    	<table className="table table-light table-hover" style={{"textAlign": "center"}}>
	    		<thead className="thead-dark">
	    		<tr>
	    			<th>Account Number</th>
	    			<th> Current Win Chances </th>
	    			<th> Contribution in Ether (approx) </th>
	    		</tr>
	    		</thead>
	    		<tbody style={{"fontWeight": "bold"}}>
	    			{tableRows}
	    		</tbody>
	    		</table>
	    	);
	    
	    return returnContents;

	}
}

export default LeaderBoard;