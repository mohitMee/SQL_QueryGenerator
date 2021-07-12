import React from 'react';
import './index.css';
import JoinColumn from "./joincolumn"

const wrapper = {
  display: 'flex',
  flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#423',
}


class ChildForm extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
        
        dropDownList : [],
        
        fact : '',
        
        filterfields : [],

        factfields : [],

        selectedfields : [],

        groupbyfields : [],

        operations : ['>','<','=','BETWEEN','IN'],
       
        joinColThis : [''],

        joinColMain : [''],
    };
    
    this.handleSubmit1 = this.handleSubmit1.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChange1 = this.onChange1.bind(this);

    this.onChange = this.onChange.bind(this);

    this.nullify = this.nullify.bind(this);

    this.addJoinColumn = this.addJoinColumn.bind(this);

    this.updateJoinCol = this.updateJoinCol.bind(this);

    }

  componentDidMount() {
    
    fetch('http://127.0.0.1:18080/resource/facts', {
    
    	method: 'POST',
    
    })

    .then(response => {
    
    	if(!response.ok) alert("Http-Error : " + response.status);
    
    	return response.json();
    
    	})
    
    .then(data => {
    
      this.setState({dropDownList : data});
    
    });
  
  }


  async handleSubmit1(event) {
   
   	event.preventDefault();
    
    const data = new FormData(event.target);
    
    let factname;
   
    for (const [key, value]  of data.entries()) {
    
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

  handleSubmit(event){

 	event.preventDefault();
 
	const data = new FormData(event.target);

	let selectedfields = this.state.selectedfields;

	let groupbyfields = this.state.groupbyfields;


   	var check = selectedfields.every((el) => {
	
		return groupbyfields.indexOf(el) !== -1;
	
	});

	if((this.props.GroupBy===true)&&(check===false)){

		alert('Select Field should be subset of groupby Field');
	}

	else this.props.submitHandler(data,this.state.fact,this.props.index); 

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
  
  nullify(e){

  	e.preventDefault();

  	this.props.nullifyindex(this.props.index);

  }

  addJoinColumn(e){

  	e.preventDefault();

  	let newlist = this.state.joinColThis;

  	newlist.push([]);

  	this.setState({joinColThis : newlist});

  	newlist = this.state.joinColMain;

  	newlist.push([]);

  	this.setState({joinColMain : newlist});

  }

  updateJoinCol(index,joinColThis,joinColMain){

  	let newlist	= this.state.joinColThis;

  	newlist.splice(index,1,joinColThis);

  	this.setState({joinColThis : newlist});

  	newlist = this.state.joinColMain;

  	newlist.splice(index,1,joinColMain);

  	this.setState({joinColMain : newlist});
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

      	<button style={{margin:"10px"}}> Submit </button>
      	
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
      			
      			<br/>Select Group by column<br/>
      
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
        
        <div> <h3 style={wrapper}> Join Columns</h3></div>

        {this.state.joinColThis.map((key,value) =>(
        	
        	<div key={value}> < JoinColumn mainselectlist={this.props.mainselectlist} factfields={this.state.factfields} index={key} updateJoinCol={this.updateJoinCol}/> </div>
        	))
        }

    	<div style={{padding:"20px"}} />

    	<div style={wrapper}>

    		<button onClick={this.addJoinColumn}>
    			
    			Add new Join

    		</button>	

    	</div>

        <div style={wrapper}>
        
        <br /><input style={{margin:"10px"}} type="submit" value="Apply" />
      	
      	</div>

      	</form>
      
      </div>
      
      <div style={wrapper}>

      	<button onClick={this.nullify}> Remove table from query </button>
      
      </div> 

      </React.Fragment>
    
    );
  
  }

}

export default ChildForm;
