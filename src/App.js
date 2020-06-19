import React from 'react';
import {Component} from 'react';
import './App.css';
import NavHeader from './resources/NavHeader';
import { Auth } from 'aws-amplify';
import Routes from './resources/Routes';
import {BrowserRouter} from 'react-router-dom';
import TestBody from './resources/TestBody'

class App extends Component {
  constructor () {
    super()
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    }
  }

  componentDidMount(){
    Auth.currentAuthenticatedUser()
    .then(function (user) {
      this.setState({
        isAuthenticated: true,
        isAuthenticating: false
      })
    }.bind(this))
    .catch(function(err){
      this.setState({
        isAuthenticated: false,
        isAuthenticating: true
      })
    }.bind(this))
  }

  userHasAuthenticated (newStatus) {
    this.setState({isAuthenticated: newStatus});
  };

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
  }

  render () {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated.bind(this)
    }

    return (
      <BrowserRouter>
        <div className="App" style={{min_height: "100%", position: "relative"}}>
          <NavHeader 
            userHasAuthenticated={this.userHasAuthenticated.bind(this)}
            handleLogout={this.handleLogout.bind(this)}
            isAuthenticated={this.state.isAuthenticated}>
          </NavHeader>
          <Routes childProps={ childProps } />
          
          <TestBody 
            isAuthenticated={this.state.isAuthenticated}
          >
          </TestBody>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
