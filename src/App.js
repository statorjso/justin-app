import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component{
  constructor(props) {
    super(props);

    const loggedInUsername = localStorage.getItem("username");
    if (loggedInUsername)
      this.state = {authenticated: true, username: loggedInUsername, password: '', failedLogin: false};
    else
      this.state = {authenticated: false, username: '', password: '', failedLogin: false};
  }
  
  // login = (success, username) => {
  login = (success, username, token) => {
    if (success)
    {
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);

      this.setState({
        authenticated: true,
        username: username,
        failedLogin: false
      });
    }
    else
    this.setState({
      authenticated: false,
      username: '',
      failedLogin: true,
      token: null
    });
  }

  logout = () => {
    localStorage.removeItem('username');

    this.setState({
      authenticated: false,
      username: ''
    });
  }

  render() {
      return ( 
        this.state.authenticated ? <Homepage logout={this.logout} username={this.state.username} /> : <Login login={this.login} failedLogin={this.state.failedLogin} />
      )
  } 
}

///////////////////////////////////////////////
// Login component
///////////////////////////////////////////////
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', loginSuccess: false};

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

  handleSubmit = async () => {

    // await axios.get('https://localhost:44329/authentication/test')
    //   .then(response => this.setState({ loginSuccess: response.data }));

    // const response = await axios.get('https://localhost:44329/authentication/test');
    const response = await axios.post('https://localhost:44329/authentication/Authenticate',
    { UserId : 22, Username : this.state.username, Password : this.state.password });
    // this.setState({ loginSuccess: true });

    // if(response){    
    // if(response.data === true){
    if(response.data && response.data !== ''){
      // this.setState({
      //   authenticated: true,
      //   failedLogin: false
      // });

      // this.props.authenticated = true;
      // this.props.failedLogin = false;

      // this.props.login(e.target.value);
      // this.props.login(true, this.state.username);
      this.props.login(true, this.state.username, response.data);
    }
    else
      // this.setState({
      //   authenticated: false,
      //   failedLogin: true
      // });

      // this.props.authenticated = false;
      this.props.login(false, '', null);
  }
  
  render() {
    const failedLogin = this.props.failedLogin;
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
          { failedLogin && 'Login failed' }
        </header>
      </div>
      );
  }
}

///////////////////////////////////////////////
// Homepage component
///////////////////////////////////////////////
class Homepage extends React.Component{
  constructor(props) {
    super(props);
    // this.state = {username: '', password: ''};

    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }
  
  render() {
    const username = this.props.username;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Homepage.  Welcome, {username}
          </p>
          Add additional content here
          <br/><br/><input type="submit" value="Logout" onClick={this.handleLogout} />
        </header>
      </div>
      );
  }
}

export default App;
