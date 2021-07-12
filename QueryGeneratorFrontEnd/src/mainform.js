import React from 'react';
import './index.css';

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#423',
}


class MainForm extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
        
        dropDownList : [],
        
        fact : '',
        
        filterfields : [],

        factfields : [],

        selectedfields : [],

        groupbyfields : [],
        
        operations : ['>','<','=','BETWEEN','IN']
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.handleSubmit1 = this.handleSubmit1.bind(this);

    this.onChange1 = this.onChange1.bind(this);

    this.onChange = this.onChange.bind(this);
    }

  componentDidMount() {

  	let flag = 0
    
    fetch('http://127.0.0.1:18080/resource/facts', {
    
    	method: 'POST',
    
    })

    .then(response => {
    
    	if(!response.ok) alert("Http-Error : " + response.status);
    	
    	else flag = 1;

    	return response.json();
    
    	})
    
    .then(data => {
    
      if(flag===1) this.setState({dropDownList : data});
    
    });
  
  }

	async handleSubmit(event) {
   
   		event.preventDefault();
    	
    	const data = new FormData(event.target);

    	let filterfieldvalues = []

    	let filterfieldoperations = []

    	let filterfields = []

    	let flag = 0

    	for (const [key, value]  of data.entries()) {

    		if((key==='selectedfields')||(key==='groupbyfields')) continue;

    		if(flag===0){

    			flag = 1;

    			filterfieldoperations.push(value);
    		}

    		else{

    			flag = 0;

    			filterfieldvalues.push(value);

    			filterfields.push(key);
    		}

    	}

    	let jsondata = {}

    	jsondata['fact'] = this.state.fact;

    	jsondata['selectedfields'] = this.state.selectedfields;

    	jsondata['groupbyfields'] = this.state.groupbyfields;

    	jsondata['filterfields'] = filterfields;

    	jsondata['filterfieldvalues'] = filterfieldvalues;

    	jsondata['filterfieldoperations'] = filterfieldoperations;

    	let selectedfields = this.state.selectedfields;

		let groupbyfields = this.state.groupbyfields;

	   	var check = selectedfields.every((el) => {
	
			return groupbyfields.indexOf(el) !== -1;
		
		});

		if((this.props.GroupBy===true)&&(check===false)){

			alert('Select Field should be subset of groupby Field');
		}

		else this.props.submitHandler(jsondata);

    	}

  async handleSubmit1(event) {
   
   	event.preventDefault();

   	this.props.nullifier();
    
    const data = new FormData(event.target);
    
    let factname;
   
    for (const [key ,value]  of data.entries()) {
    
      factname = value;
    
    }

    this.setState({fact : factname});
    
    await fetch('http://127.0.0.1:18080/resource/factfield', {
    
    	method: 'POST',
    	
    	body: JSON.stringify(factname),
    
    })
    
    .then(response => {
    	
    	if(!response.ok) alert("Http-Error : " + response.status);
    	
    	return response.json();
    	
    })
    
    .then(data => {
    	
      var tmp = [];
      
      for(var i=0;i<data.length;i++){
        
        tmp.push(JSON.parse(data[i]));
      
      }
		
      this.setState({factfields : tmp});

      this.props.mainselectlisthandler(tmp);

      
    });
    
    await fetch('http://127.0.0.1:18080/resource/filterfield', {
    
    	method: 'POST',
    	
    	body: JSON.stringify(factname),
    
    })
    
    .then(response => {
    	
    	if(!response.ok) alert("Http-Error : " + response.status);
    	
    	return response.json();
    	
    })
    
    .then(data => {
    	
      var tmp = [];
      
      for(var i=0;i<data.length;i++){
        
        tmp.push(JSON.parse(data[i]));
      
      }

      this.setState({filterfields : tmp});
    
    });
   
  }

  onChange(e){ 

  	this.setState({[e.target.name] : e.target.value});

}
  
  onChange1(e){
  		
  		var options = e.target.options;
  		
  		var value = [];
  			
  		for (var i = 0, l = options.length; i < l; i++) {
    
    	if (options[i].selected) {
      		
      		value.push(options[i].value);
    	}
  	}

  this.setState({[e.target.name] : value});
  
  }

   
  

  render() {
    
    return (

      <React.Fragment>
      
      
      <div style={wrapper}>
      	
      	<form onSubmit = {this.handleSubmit1}>
      	
      	<div>

      		<label >
        
            	<br />Select the fact<br />
        
        	</label>
        

        	<select style={{margin:"15px",width:"200px"}} value = {this.state.fact} name="fact" onChange = {this.onChange} required>
      
        	{this.state.dropDownList.map((Values) => <option key={Values} value={Values}>{Values}</option>)}
      	
      		</select>

      	</div>

      	<div style={wrapper}>

      		<button> Submit </button>
      	
      	</div>
      	
      	</form>
      
      </div>
      
      <div style={{padding:"5px"}}/>
      
      <div style={wrapper}>

      	<form onSubmit={this.handleSubmit}>
      	
      	<div style={wrapper}>

      		<label>
      			
      			<br/> Select columns you want<br/>
      
      		</label>	

      		<select multiple={true} style={{margin:"15px",width:"200px"}} name="selectedfields" value={this.state.selectedfields} onChange = {this.onChange1} required>
      
        	{this.state.factfields.map((Values) => <option key={Values} value={Values}>{Values}</option>)}
      	
      		</select>	
      	
      	</div>

      	<div style={wrapper}>

      		<label>
      			
      			<br/> Select Group By Column<br/>
      
      		</label>	

      		<select multiple={true} style={{margin:"15px",width:"200px"}} name="groupbyfields" value={this.state.groupbyfields} onChange = {this.onChange1}>
      
        	{this.state.factfields.map((Values) => <option key={Values} value={Values}>{Values}</option>)}
      	
      		</select>	
      	
      	</div>
        
        {this.state.filterfields.map((FilterField,idx) => (
          
          <React.Fragment key={idx}>

          	<div className="rowAllign" style={{width:"95px"}}>
            
            	<label>
            
            		<br />operation<br />
        	
        		</label>
          		
          		<select name= {FilterField['columnName'] +"-op"} >
      
        		{this.state.operations.map((Values) => <option key={Values} value={Values}>{Values}</option>)}
      	
      			</select>
            
          	</div>

          	<div className="rowAllign" style={{width:"200px"}}>
            
            	<label>
            		
            		<br />Enter {FilterField['columnName']} ({FilterField['dataType']})<br />
        		
        		</label>
            
            	<input
              		
              		type="text"

              		name={FilterField['columnName']}
            	/>

          	</div>

          	<div style={{padding:"10px"}}/>

      	  </React.Fragment>
        
        ))}
        
	    <div style={wrapper}>

        	<br /><input style={{margin:"10px"}} type="submit" value="Generate Query" />
      	
      	</div>

      	</form>
      
      </div>
     
      </React.Fragment>
    
    );
  
  }

}

export default MainForm;
