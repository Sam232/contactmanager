import React, { Component } from "react";
import Contact from "./Contact";

import { Consumer } from "../../context";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {    
            const { contacts, err } = value;
            return(
              <React.Fragment>
                <h1 className="display-4">
                  <span className="text-danger">Contact</span> List                  
                </h1>
                <p className="text-danger">{err}</p>
                {
                  contacts.map(contact => (
                  <Contact
                    key={contact.id}
                    contact={contact}
                  />
                ))}
              </React.Fragment>
            );              
          }
        }
      </Consumer>
    );
  }
}

export default Contacts;