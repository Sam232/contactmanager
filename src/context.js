import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type){
    case "ADD_CONTACT": 
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    case "UPDATE_CONTACT": 
      return {
        ...state,
        contacts: state.contacts.map(
          contact => contact.id === action.payload.id 
          ? contact = action.payload.contact : contact)
      }
    case "DELETE_CONTACT": 
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload.id)
      }
    case "ERROR":
      return {
        ...state,
        err: action.payload
      }
    default: 
      return state
  }
};

export class Provider extends Component{
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => {
        return reducer(state, action);
      });
    },
    err: ''
  };

  async componentDidMount(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({
      contacts: response.data
    });
  }

  render(){
    return(
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;