import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);

    const loggedInUsername = localStorage.getItem("username");
    if (loggedInUsername)
      this.state = {authenticated: true, username: loggedInUsername, password: '', failedLogin: false};
    else
      this.state = {authenticated: false, username: '', password: '', failedLogin: false};
  }
  
  login = (success, username) => {
    if (success)
    {
      localStorage.setItem('username', username);

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
      failedLogin: true
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
    // fetch('https://localhost:44329/authentication/Authenticate?' + new URLSearchParams({
      // username: this.state.username, password: this.state.password, }));

    // fetch('https://localhost:44329/authentication/test')
    //   .then(response => response.json())
    //     .then(data => this.setState({ loginSuccess: data }));;

    const response = await fetch('https://localhost:44329/authentication/test');

    // fetch('https://localhost:44329/authentication/Authenticate', 
    //   { method: 'POST', body: JSON.stringify({ UserId : -1, Username : this.state.username, Password : this.state.password }) })
    //     .then(response => response.json())
    //       .then(data => this.setState({ loginSuccess: data }));;

    if(response){
      // this.setState({
      //   authenticated: true,
      //   failedLogin: false
      // });

      // this.props.authenticated = true;
      // this.props.failedLogin = false;

      // this.props.login(e.target.value);
      this.props.login(true, this.state.username);
    }
    else
      // this.setState({
      //   authenticated: false,
      //   failedLogin: true
      // });

      // this.props.authenticated = false;
      this.props.login(false, '');
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
