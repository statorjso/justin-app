import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {authenticated: false, username: '', password: ''};
  }
  
  login = (username) => {
    this.setState({
      authenticated: true,
      username: username
    });
  }

  logout() {
    this.setState({
      authenticated: false,
      username: ''
    });
  }

  render() {
      return ( 
        this.state.authenticated ? <Content logout={this.logout} /> : <Login login={this.login} />
      )
  } 
}

// Login component
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', failedLogin: false};

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit() {
    if(this.state.username === 'joh' && this.state.password === 'test'){
      // this.setState({
      //   authenticated: true,
      //   failedLogin: false
      // });

      // this.props.authenticated = true;
      // this.props.failedLogin = false;

      // this.props.login(e.target.value);
      this.props.login(this.state.username);
    }
    else
      // this.setState({
      //   authenticated: false,
      //   failedLogin: true
      // });

      // this.props.authenticated = false;
      this.setState({failedLogin: true});
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
            {/* <label>{this.props.authenticated}</label> */}
            <label>Username:</label>
            <input type="text" id="username" name="username" onChange={this.handleUsernameChange} />
            {/* <label>{this.state.username}</label> */}
            <label>Password:</label>
            <input type="text" id="password" name="password" onChange={this.handlePasswordChange} />
            <br/><input type="submit" value="Submit" onClick={this.handleSubmit} />
          {/* </form> */}
          { this.state.failedLogin && 'Login failed' }
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
