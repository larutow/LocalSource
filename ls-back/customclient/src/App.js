import logo from './logo.svg';
import './App.css';
import jwt_decode from "jwt-decode";
import Navbar from './components/Navbar';
import { Router, Switch, Route, Link, Redirect, useHistory, withRouter} from "react-router-dom";
import React, { Component } from 'react';
import history from "./history"
import axios from 'axios';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Account from './components/Account/Account'
import setAuthToken from './utils/setAuthToken'

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.setLogin = this.setLogin.bind(this);

    this.state = { searchterm: '', searchclick:null, foundData:null, isLoggedIn: false, userName:''};
    
  }

  handleSearchChange = event => {
    this.setState({
      searchterm: event.target.value
    });
  }

  handleSearchSubmit = (e, searchTerm) => {
    e.preventDefault();
    alert('HandleSearchSubmit function in app.js');
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      console.log(response.data);
      this.setState({foundData: response.data});
    }).then(() => history.push('/products/searchresults'));

  }

  setLogin = (e,email,pass) =>{
    e.preventDefault();
        console.log(email);
        console.log(pass);
        //axios post - login
        axios
            .post("http://localhost:5000/api/users/login", {email: email, password: pass})
            .then(res => {
                // Save to localStorage
                // Set token to localStorage
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                // Set token to Auth header
                setAuthToken(token);
                // Set current user
                history.push("/");
                this.setState({isLoggedIn: true});

            })
            .catch(err =>
                //login failure - 
                console.log(err)
            );
  }
componentDidMount(){
  if(localStorage.jwtToken){
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token)
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
      //logout (clear token? - render register / login? isLoggedIn = false)
      this.setState({isLoggedIn: false});
    }else{
      this.setState({isLoggedIn: true});
    }
  }
}

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar searchterm={this.state.searchterm} handleSearchChange={this.handleSearchChange} handleSearchSubmit = {this.handleSearchSubmit} isLoggedIn = {this.state.isLoggedIn}/>
          <Switch>
            <Route path="/login"><Login setLogin={this.setLogin}/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/account"><Account/></Route>
            <Route path ={["/", "/products"]}><Home searchterm={this.state.searchTerm} products={this.state.foundData}/></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;