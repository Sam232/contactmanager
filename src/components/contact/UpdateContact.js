import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import UpdateInputGroup from '../layout/UpdateInputGroup';

class UpdateContact extends Component{
  constructor(){
    super();     
    this.state = {
      user: {
        id: '',
        name: '',
        email: '',
        phone: ''
      },
      validation: {
        name: '',
        email: '',
        phone: ''
      },
      updateState: '',
      error: ''
    };
  }

  onSubmit = async (value, e) => {
    e.preventDefault();
    const { user } = this.state; 

    if(!user.name){
      return this.setState({
        validation: {
          ...this.state.validation,
          name: 'Name Is Required'
        }
      });
    }

    if(!user.email){
      return this.setState({
        validation: {
          ...this.state.validation,
          name: '',
          email: 'Email Is Required'
        }
      });
    }

    if(!user.phone){
      return this.setState({
        validation: {
          name: '',
          email: '',
          phone: 'Phone Is Required'
        }
      });
    }

    try{
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      if(response.data){
        this.setState({
          validation: {
            name: '',
            email: '',
            phone: ''
          },
          updateState: 'Update Successful'
        });

        const { dispatch } = value;

        const action = {
          type: 'UPDATE_CONTACT',
          payload: {
            id: user.id,
            contact: response.data
          }
        };
        dispatch(action);
        return this.props.history.push("/");
      }
      this.setState({
        validation: {
          name: '',
          email: '',
          phone: ''
        },
        error: 'Unable To Fetch User Data, Try Again'
      });
    }
    catch(e){
      this.setState({
        validation: {
          name: '',
          email: '',
          phone: ''
        },
        error: 'Unable To Fetch User Data, Try Again'
      });
    }
  }

  async componentDidMount(){
    const userId = this.props.match.params.id;
    try{
      const response = await axios.get(`http://jsonplaceholder.typicode.com/users/${userId}`);
      const { id, name, email, phone } = response.data;
      this.setState({
        user: {
          id,
          name,
          email,
          phone 
        }
      });
    }
    catch(e){
      this.setState({
        error: 'Unable To Fetch User Data, Try Again'
      });
    }
  }

  render(){
    const { name, email, phone } = this.state.user;
    const validation = this.state.validation;
    const updateState = this.state.updateState;
    const error = this.state.error;

    return(
      <Consumer>
        {
          value => {
            return(
              <div>
                <div className="card mb-3">
                  <div className="card-header">
                    Update Contact            
                  </div>
                  <div className="card-body">
                    <p className="text-success">{updateState}</p>
                    <p className="text-danger">{error}</p>
                    <form onSubmit={this.onSubmit.bind(this, value)}>
                      <UpdateInputGroup label="Name" name="name" value={name} placeholder="Enter Name" error={validation.name} onChange={(e) => {
                          this.setState({
                            user: {
                              ...this.state.user,
                              name: e.target.value
                            }
                          });
                        }}/>

                        <UpdateInputGroup label="Email" name="email" value={email} type="email" placeholder="Enter Email" error={validation.email} onChange={(e) => {
                          this.setState({
                            user: {
                              ...this.state.user,
                              email: e.target.value
                            }
                          });
                        }}/>

                        <UpdateInputGroup label="Phone" name="phone" value={phone} placeholder="Enter Phone" error={validation.phone} onChange={(e) => {
                          this.setState({
                            user: {
                              ...this.state.user,
                              phone: e.target.value
                            }
                          });
                        }}/>
                      <button type="submit" className="btn btn-light btn-block">Update</button>
                    </form>
                  </div>
                </div> 
              </div>
            );
          }
        }              
      </Consumer>
    );
  }
}

export default UpdateContact;