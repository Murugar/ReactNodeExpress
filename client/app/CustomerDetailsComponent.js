import React from 'react';
import { render } from 'react-dom'
import CustomerService from './CustomerService'
import { Router, Route, hashHistory } from 'react-router'


export default class CustomerDetailsComponent extends React.Component {
  state={status: "", customer: {}}

 constructor(props) {
   super(props);

   CustomerService.get().getCustomer(props.params.customerId).then((result)=>{
     this.setState({status: "Successfully Loaded Customer Details", customer: result});
   }).catch((reason)=>{
     this.setState({status: "error: "+reason});
   });
   

   
   
 }
  onEditCustomer = (event) => {
      event.preventDefault();
      console.log("onEditCustomer");
      
      if ((this.state.newName == undefined) && (this.state.newCity == undefined))
    	  {
    	     console.log("Unchanged");
    	     this.setState({status:"Customer unchanged."});
    	  }
      else if ((this.state.newName == undefined) )
	  {
	     console.log("Unchanged");
	     this.setState({status:"Customer unchanged."});
	  }
      else if ((this.state.newCity == undefined) )
	  {
	     console.log("Unchanged");
	     this.setState({status:"Customer unchanged."});
	  }
 
      else
    	  {
      CustomerService.get().editCustomer(this.state.customer.id,this.state.newName,this.state.newCity).then((result) =>{
          
    	 
    	  console.log(this.state.newName);
    	  console.log(this.state.newCity);
    	  
    	 
    	  this.state.customer.name = this.state.newName;
          this.state.customer.city = this.state.newCity;
          this.setState({status:"Customer changed."});
    	
    	  
          console.log(this.state.customer);
          
          
          this.props.router.push('/');
          
      }).catch((reason)=>{
          this.setState({satus:"error: " + reason});
      });
    	  }
  }
  onEditCustomerFormChanged = (event) =>{
      this.setState({[event.target.name]: event.target.value});
  };

 
  
  render() {
    return  <div className="row">
    <div className="col-md-offset-2 col-md-6"> <div className="panel panel-danger">
	<div className="panel-heading">Customer Edit</div>
	<div className="panel-body"><div> <h4 className="text-success">{this.state.status} </h4><br/> <br/> 
     
      <form onSubmit={this.onEditCustomer} onChange={this.onEditCustomerFormChanged}>
          <div className="form-group">
          <label for="name" className="text-primary">Name: </label>
          <input type="text" className="form-control" name="newName" id="name" 
              value={this.state.newName} placeholder={this.state.customer.name} />
          </div>
          <div className="form-group">
          <label for="city" className="text-primary" >City: </label>
        	  <input type="text" name="newCity" className="form-control" id="city" 
        	       value={this.state.newCity} placeholder={this.state.customer.city}
        	
        	  />
          </div>
          <input className="btn btn-warning" type = "submit" value="Update Customer" />
      </form>
          </div>
          </div>
          </div>
          </div>
    </div>
  }
}
