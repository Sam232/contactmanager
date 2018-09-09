import React, { Component } from "react";
import axios from 'axios';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

class AddContact extends Component {
  constructor(){
    super();
    this.state = {
      name: "",
      email: "",
      phone: ""
    };

    this.validation = {
      nameRequired: "",
      emailRequired: "",
      phoneRequired: ""
    };
  }
  

  onChange = e => this.setState({[e.target.name]: e.target.value
  });

  onSubmit = async (value, e) => {
    e.preventDefault();

    if(!this.state.name){
      this.validation.nameRequired = "Name Is Required";
      return this.setState({
        name: "",
        email: "",
        phone: ""
      });
    }

    if(!this.state.email){
      this.validation.nameRequired = "";
      this.validation.emailRequired = "Email Is Required";
      return this.setState({
        name: this.state.name,
        email: "",
        phone: ""
      });
    }

    if(!this.state.phone){
      this.validation.nameRequired = "";
      this.validation.emailRequired = "";
      this.validation.phoneRequired = "Phone Is Required";
      return this.setState({
        name: this.state.name,
        email: this.state.email,
        phone: ""
      });
    }

    this.validation.nameRequired = "";
    this.validation.emailRequired = "";
    this.validation.phoneRequired = "";

    const { dispatch } = value;

    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", this.state);
    const action = {
      type: "ADD_CONTACT",
      payload: response.data
    };

    dispatch(action);
    this.setState({ 
      name: "",
      email: "",
      phone: ""
    });

    //Redirect To Home Page
    this.props.history.push("/");  
  };

  render() {
    const { name, email, phone } = this.state;
    const { nameRequired, emailRequired, phoneRequired } = this.validation;

    return (
      <Consumer>
        { value => {
          return(
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, value)}>
                  <TextInputGroup label="Name" name="name" placeholder="Enter Name" value={name} required={nameRequired} onChange={this.onChange} />

                  <TextInputGroup label="Email" type="email" name="email" placeholder="Enter Email" value={email} required={emailRequired} onChange={this.onChange} />

                  <TextInputGroup label="Phone" name="phone" placeholder="Enter Phone" value={phone} required={phoneRequired} onChange={this.onChange} />
                  
                  <input
                    type="submit"
                    className="btn btn-light btn-block"
                    value="Add Contact"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
