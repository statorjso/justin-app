import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }

  render() {
    if (!this.state.authenticated)
    {
      return ( <Login /> );
    }
  } 
}

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Justin's React app.
          </p>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label for="password">Password:</label>
          <input type="text" id="password" name="password" />
        </header>
      </div>
      );
  }
}

class Content extends React.Component{
  constructor(props) {
    super(props);
    // this.state = {username: '', password: ''};

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Successful login.
          </p>
          Yay
        </header>
      </div>
      );
  }
}

export default App;
