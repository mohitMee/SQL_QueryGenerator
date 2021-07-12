import React from 'react';
import './index.css';

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#423',
}


class JoinColumn extends React.Component{

	constructor(props) {

		super(props);

		this.state = {

			joinColThis : '',

			joinColMain : ''

		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e){

		e.preventDefault();

		this.setState({[e.target.name] : e.target.value});

		this.props.updateJoinCol(this.props.index,this.state.joinColThis,this.state.joinColMain);
	}

	render(){

		return(
				<React.Fragment>

				<div className="rowAllign1">

				<label >
    	    	
            		<br />column[this]<br />
        
       		 	</label>
        

        		<select  style={{margin:"15px",width:"100px"}}  value = {this.state.joinColThis} name="joinColThis" onChange = {this.onChange} required>
      
	        	{this.props.factfields.map((Values) => <option key={Values} value={Values}>{Values}</option>)}
    	  	
    	  		</select>

    	  		</div>

    	  		<div className="rowAllign1">

      			<label >
        
            		<br />column[main]<br />
        
        		</label>
        

    	    	<select  style={{margin:"15px",width:"100px"}} value = {this.state.joinColMain} name="joinColMain" onChange = {this.onChange} required>
      
        		{this.props.mainselectlist.map((Values) => <option key={Values} value={Values}>{Values}</option>)}
      		
      			</select>

	      		</div>

	      		</React.Fragment>

			);
	}

}

export default JoinColumn;

