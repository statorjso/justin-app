import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {authenticated: false, username: ''};
  }

  render() {
    if (!this.state.authenticated)
    {
      return ( <Login authenticated={this.state.authenticated} username={this.state.username} /> );
    }
    else
    {
      return ( <Content authenticated={this.state.authenticated} username={this.state.username} /> );
    }
  } 
}

// Login component
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {authenticated: props.authenticated, username: props.username, password: '', failedLogin: false};

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit() {
    if(this.state.username === 'joh' && this.state.password === 'test'){
      // this.setState(prevState => ({
      //   isToggleOn: !prevState.isToggleOn
      // }));

      this.setState({
        authenticated: true,
        failedLogin: false
      });
    }
    else
    this.setState({
      failedLogin: true
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Justin's React app.
          </p>
          {/* <form onSubmit={this.handleSubmit}> */}
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" onChange={this.handleUsernameChange} />
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          {/* </form> */}
          {this.state.failedLogin &&
              'Login failed'
          }
        </header>
      </div>
      );
  }
}

// Content component
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
