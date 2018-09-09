import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";  
import Header from "./components/layout/Header";
import Contacts from "./components/contact/Contacts";
import AddContact from "./components/contact/AddContact";
import UpdateContact from './components/contact/UpdateContact';
import Test from './components/test/Test';
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/update/:id" component={UpdateContact}/>
                <Route exact path="/about/" component={About} />
                <Route exact path="/test"component={Test} />
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
