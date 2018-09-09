import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Consumer } from "../../context";

class Contact extends Component {
  state = {
    showContactInfor: false
  };

  static propTypes = {
    contact: PropTypes.object.isRequired
  };

  onDeleteContact = async (id, value) => {
    const { dispatch } = value;
    const action = {
      type: "DELETE_CONTACT",
      payload: id
    }    

    try{
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);      
      dispatch(action);   
    }
    catch(e){
      const action = {
        type: "DELETE_CONTACT",
        payload: id
      }    
      dispatch(action);  
    }
  }

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfor } = this.state;

    return (
      <Consumer>
        { value => {
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}                
                <i
                  onClick={() => {
                    this.setState({
                      showContactInfor: !this.state.showContactInfor
                    });
                  }}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" }}
                />
                <i 
                  className="fas fa-times" 
                  style={{
                    cursor: "pointer", 
                    color: "red", 
                    float: "right"
                  }} 
                  onClick={this.onDeleteContact.bind(this, id, value)}></i>   
                <Link to={`/contact/update/${id}`}>
                  <i 
                    className="fas fa-pencil-alt" 
                    style={{
                      cursor: "pointer",
                      float: "right",
                      marginRight: "1rem",
                      color: "black"                      
                    }}>
                  </i>
                </Link>  
              </h4>
              {showContactInfor ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>  
    );
  }
}

Contact.defaultProps = {
  contact: {
    name: "Samuel Fiatse",
    email: "sam@gmail.com",
    phone: "222-222-2222"
  }
};

// Contact.propTypes = {
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired
// }

export default Contact;
