import React from 'react';
import { render } from 'react-dom'
import CustomerService from './CustomerService'

export default class CustomerListComponent extends React.Component {
  state={status: "", customers: [], newCustomerName: "", newCustomerCity: "", newDelete:""}

  constructor() {
    super();

    CustomerService.get().getCustomers().then((result)=>{
      this.setState({status: "Successfully Loaded Customers", customers: result});
    }).catch((reason)=>{
      this.setState({status: "error: "+reason});
    });
  }

  // Event methods, which are called in render(), are declared as properties:
  onNewCustomerFormChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // Event methods, which are called in render(), are declared as properties:
  onNewCustomer = (event) => {
    event.preventDefault();
    var name=this.state.newCustomerName;
    var city=this.state.newCustomerCity;
    CustomerService.get().addCustomer(name, city).then((result)=>{
      this.state.customers.push({id: result, name: name, city});
      this.setState({status: "successfully added new customer", customers: this.state.customers, newCustomerName: "", newCustomerCity: ""});
    }).catch((reason)=>{
      this.setState({status: "error: "+reason});
    });
  }
  
 

  onDeleteCustomer = (event, id) => {
	this.state.newDelete = id
	
    event.preventDefault();
    CustomerService.get().deleteCustomer(this.state.newDelete).then((result) => {
      console.log(this.state);
      for(var c=0;c<this.state.customers.length;c++){
        if(this.state.customers[c].id == this.state.newDelete){
          this.state.customers.splice(c,1);
          console.log(this.state);
          this.setState({status: "successfully deleted customer", customers : this.state.customers});
          break;
        }
      }
      this.setState({status:"Customer deleted.", customers:this.state.customers});
    }).catch((reason)=>{
      this.setState({status:"Error: "+reason});
    });
  }
  onDeleteCustomerFormChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    var listItems = this.state.customers.map((customer) =>
      <tr>
      <td className="info">{customer.id}</td>
      <td className="info">{customer.name}</td>
      <td className="info" >{customer.city}</td>
      <td className="info"><a href={"/#/customer/"+customer.id} className="text-success">Edit</a></td>
      <td className="info"><button className="btn btn-danger" onClick={(evt) => this.onDeleteCustomer(evt, customer.id)}>Delete</button></td>
      </tr>
    );
    return <div className="container"> <div className="panel panel-primary">
    <div className="panel-heading">Customers</div>
    <div className="panel-body">
    <div className="panel panel-info">
    <div className="panel-heading">List</div>
    <div className="panel-body text-danger">
    
    <h3 className="text-danger">{this.state.status}</h3><br/><br/>
    <div className="row">
    <div className="col-md-6">
    <div className="panel panel-primary">
    <div className="panel-heading">List Detailed Info</div>
    <div className="panel-body">
    <table className="table table-condensed table-striped">
    <thead><tr className="active">
    <td>Id</td>
    <td>Name</td>
    <td>City</td>
    <td>Edit</td>
    <td>Delete</td>
    </tr></thead>
    <tbody>{listItems}</tbody></table>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <br/>
        <div className="row">
        <div className="col-md-offset-2 col-md-6">
        <div className="panel panel-primary">
        <div className="panel-heading">Add New Customer</div>
        <div className="panel-body">
        <form className="form" onSubmit={this.onNewCustomer} onChange={this.onNewCustomerFormChanged}>
          <div className="form-group">
          <label for="name" className="text-success">Name:</label>
          <input type="text" className="form-control" name="newCustomerName" value={this.state.newCustomerName} id="name"/>
          </div>
          <div className="form-group">
          <label for="city"  className="text-success">City:</label>
        	  <input className="form-control" type="text" name="newCustomerCity" 
        		  value={this.state.newCustomerCity} id="city" />
          </div>
          <input className="btn btn-primary" type="submit" value="Add Customer"/>
        </form>
          </div>  
          </div>  
         </div>  
       
          </div> 
          </div> 
          </div> 
      </div> 
  }
}
