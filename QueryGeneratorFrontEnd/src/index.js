import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LOGO from "./logo.svg"
import MainForm from "./mainform"
import ChildForm from "./childform"


const wrapper = {
  display: 'flex',
  flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#423',
}




class QueryGenerator extends React.Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
 
        lists : [],
        
        mainselectlist : [],
        
        fact : [null],
        
        filterfields : [[]],

        filterfieldvalues : [[]],

        filterfieldoperations : [[]],

        selectedfields : [[]],

        groupbyfields : [[]],

        operations : ['>','<','=','BETWEEN','IN'],
        
        query : '',

        joinColThis : [[]],

        joinColMain : [[]],

        GroupBy : false,

 
    };
 	
 	this.handleClick = this.handleClick.bind(this);

 	this.mainselectlisthandler = this.mainselectlisthandler.bind(this);

 	this.childSubmitHandler = this.childSubmitHandler.bind(this);

 	this.mainChildSubmitHandler = this.mainChildSubmitHandler.bind(this);

 	this.nullifylist = this.nullifylist.bind(this);

 	this.nullifyindex = this.nullifyindex.bind(this);

 	this.GroupByHandler = this.GroupByHandler.bind(this);
   }

  handleClick(e){

  	e.preventDefault();

  	let newlist = this.state.lists;

  	newlist.push(newlist.length);

  	this.setState({lists : newlist});

  	newlist = this.state.fact;

  	newlist.push(null);

  	this.setState({fact : newlist});

  	newlist = this.state.filterfields;

  	newlist.push([]);

  	this.setState({filterfields : newlist});

  	newlist = this.state.selectedfields;

  	newlist.push([]);

  	this.setState({selectedfields : newlist});

  	newlist = this.state.joinColThis;

  	newlist.push([]);

  	this.setState({joinColThis : newlist});

  	newlist = this.state.joinColMain;

  	newlist.push([]);

  	this.setState({joinColMain : newlist});

  	newlist = this.state.groupbyfields;

  	newlist.push([]);

  	this.setState({groupbyfields : newlist});

  	newlist = this.state.filterfieldvalues;

  	newlist.push([]);

  	this.setState({filterfieldvalues : newlist});

	newlist = this.state.filterfieldoperations;

  	newlist.push([]);

  	this.setState({filterfieldoperations : newlist});

  }

  nullifylist(){
  	
  	let newlist = this.state.lists;

  	var k = newlist.length + 1;

  	if(k>0){

  		this.setState({fact : Array(k).fill(null)});

  		this.setState({filterfields : Array(k).fill([])});

  		this.setState({selectedfields : Array(k).fill([])});

 		this.setState({joinColThis : Array(k).fill([])});

  		this.setState({joinColMain : Array(k).fill([])});

  		this.setState({groupbyfields : Array(k).fill([])});

  		this.setState({filterfieldvalues : Array(k).fill([])});

  		this.setState({filterfieldoperations : Array(k).fill([])})


  	}
	
  }

  nullifyindex(index){

  		var newlist = this.state.fact;

  		newlist.splice(index,1,null);

  		this.setState({fact : newlist});

  		 newlist = this.state.filterfields;

  		newlist.splice(index,1,[]);

  		this.setState({filterfields : newlist});

  		 newlist = this.state.selectedfields;

  		newlist.splice(index,1,[]);

  		this.setState({selectedfields : newlist});

  		 newlist = this.state.joinColThis;

  		newlist.splice(index,1,[]);

  		this.setState({joinColThis : newlist});

  		 newlist = this.state.joinColMain;

  		newlist.splice(index,1,[]);

  		this.setState({joinColMain : newlist});

  		 newlist = this.state.groupbyfields;

  		newlist.splice(index,1,[]);

  		this.setState({groupbyfields : newlist});

  		newlist = this.state.filterfieldvalues;

  		newlist.splice(index,1,[]);

  		this.setState({filterfieldvalues : newlist});

  		newlist = this.state.filterfieldoperations;

  		newlist.splice(index,1,[]);

  		this.setState({filterfieldoperations : newlist});


  }

  mainselectlisthandler(data){

  	let tmp = [];

  	for(var i=0;i<data.length;i++){
  		
  		tmp.push(data[i]);
  }

  this.setState({mainselectlist : tmp});


  }

  childSubmitHandler(data,table,index){

		let newlist = this.state.fact;

		newlist.splice(index,1,table);

		this.setState({fact : newlist});

		let filterfieldvalues = []

    	let filterfieldoperations = []

    	let selectedfields = []

    	let groupbyfields = []

    	let filterfields = []

    	let joinColThis = []

    	let joinColMain = []

    	let flag = 0

    	for (const [key, value]  of data.entries()) {

    		if(key==='selectedfields'){

    			selectedfields.push(value);

    		}

    		else if(key==='groupbyfields'){

    			groupbyfields.push(value);

    		}

    		else if(key==='joinColThis'){

    			joinColThis.push(value);
    		}

    		else if(key==='joinColMain'){

    			joinColMain.push(value);

    		}

    		else if(flag===0){

    			flag = 1;

    			filterfieldoperations.push(value);
    		}

    		else{

    			flag = 0;

    			filterfieldvalues.push(value);

    			filterfields.push(key);
    		}

    	}

    	newlist = this.state.selectedfields;

    	newlist.splice(index,1,selectedfields);

    	this.setState({selectedfields : newlist});

    	newlist = this.state.groupbyfields;

    	newlist.splice(index,1,groupbyfields);

    	this.setState({groupbyfields : newlist});

    	newlist = this.state.filterfields;

    	newlist.splice(index,1,filterfields);

    	this.setState({filterfields : newlist});

    	newlist = this.state.filterfieldvalues;

    	newlist.splice(index,1,filterfieldvalues);

    	this.setState({filterfieldvalues : newlist});

    	newlist = this.state.filterfieldoperations;

    	newlist.splice(index,1,filterfieldoperations);

    	this.setState({filterfieldoperations : newlist});

    	newlist = this.state.joinColThis;

    	newlist.splice(index,1,joinColThis);

    	this.setState({joinColThis : newlist});

    	newlist = this.state.joinColMain;

    	newlist.splice(index,1,joinColMain);

    	this.setState({joinColMain : newlist});

  }

  async mainChildSubmitHandler(jsondata){

    	let newlist = this.state.fact;

    	newlist.splice(0,1,jsondata['fact']);

    	this.setState({fact : newlist});

    	newlist = this.state.selectedfields;

    	newlist.splice(0,1,jsondata['selectedfields']);

    	this.setState({selectedfields : newlist});

    	newlist = this.state.groupbyfields;

    	newlist.splice(0,1,jsondata['groupbyfields']);

    	this.setState({groupbyfields : newlist});

    	newlist = this.state.filterfields;

    	newlist.splice(0,1,jsondata['filterfields']);

    	this.setState({filterfields : newlist});

    	newlist = this.state.filterfieldvalues;

    	newlist.splice(0,1,jsondata['filterfieldvalues']);

    	this.setState({filterfieldvalues : newlist});

    	newlist = this.state.filterfieldoperations;

    	newlist.splice(0,1,jsondata['filterfieldoperations']);

    	this.setState({filterfieldoperations : newlist});

    	let jsonobject = {}

    	jsonobject['fact'] = this.state.fact;

    	jsonobject['selectedfields'] = this.state.selectedfields;

    	jsonobject['groupbyfields'] = this.state.groupbyfields;

    	jsonobject['filterfields'] = this.state.filterfields;

    	jsonobject['filterfieldvalues'] = this.state.filterfieldvalues;

    	jsonobject['filterfieldoperations'] = this.state.filterfieldoperations;

    	jsonobject['joinColThis'] = this.state.joinColThis;

    	jsonobject['joinColMain'] = this.state.joinColMain;

    	jsonobject['groupBy'] = this.state.GroupBy;

    	let flag = 0

    	console.log(JSON.stringify(jsonobject));

    	await fetch('http://127.0.0.1:18080/querygenerator', {
    
    		method: 'POST',
    	
    		body: JSON.stringify(jsonobject),
    
    	})
    
    	.then(response => {
    	
    		if(!response.ok){

    			alert("Http-Error : " + response.status);

    			flag = 1;

    		}
    	
    		return response.json();
    	
   		 })
    
    	.then(data => {

      		if(flag===0) this.setState({query : data});
    
    	});

  }

  GroupByHandler(e){

  this.setState({GroupBy : !this.state.GroupBy });

  this.nullifylist();

  }

  render() {
    
    return (
    	
    	<React.Fragment>


        <div style={{padding:"80px",display:"flex",flexDirection: 'column',alignItems: 'center',justifyContent: 'center',}}>
        
          <img src={LOGO} alt="website logo" style = {{borderRadius :40}}/>
      
        </div>

        <div style={wrapper}>

        	<label>

				<input type="checkbox" value="GROUP BY" checked={this.state.GroupBy} onChange={this.GroupByHandler} />

				GroupBy 

			</label>	

        </div>

        <div>
    	
    		<MainForm className="rowAllign" nullifier = {this.nullifylist}  GroupBy = {this.state.GroupBy} submitHandler = {this.mainChildSubmitHandler} mainselectlisthandler = {this.mainselectlisthandler}/>
    	
    	</div>

    	<div>
    	
    		{this.state.lists.map((key,Values) => <div key={key} className="rowAllign"><ChildForm key={key} GroupBy = {this.state.GroupBy} nullifyindex = {this.nullifyindex} submitHandler = {this.childSubmitHandler} mainselectlist={this.state.mainselectlist} index={Values+1}/></div>)}
    	
    	</div>

    	<div style={{padding:"20px"}} />

    	<div style={wrapper}>

    		<button onClick={this.handleClick}>
    			
    			Add new table

    		</button>	

    	</div>

    	<div style={{fontStyle:"italic",textAlign:"center"}}>
    		
    		<h3>
    		
    		{this.state.query}

    		</h3>

    	</div>

    	</React.Fragment>
      );
  }

}

ReactDOM.render(
 
  <QueryGenerator />,
 
  document.getElementById('root')

);
