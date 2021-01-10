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
    this.handleDetailsButton = this.handleDetailsButton.bind(this);
    this.setLogin = this.setLogin.bind(this);

    this.state = { searchterm: '', searchclick:null, foundData:null, isLoggedIn: false, userName:'', detailsProduct:''};
    
  }

  handleSearchChange = event => {
    this.setState({
      searchterm: event.target.value
    });
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    alert('HandleSearchSubmit function in app.js - Searchterm:' + this.state.searchterm);
    axios.post('http://localhost:5000/api/products/searchproducts', {searchterm: this.state.searchterm})
    .then((response) => {
      console.log(response.data);
      this.setState({foundData: response.data});
    }).then(() => history.push('/products/searchresults'));

  }

  setLogin = (e, email, pass) => {
    e.preventDefault();
    console.log(email);
    console.log(pass);
    //axios post - login
    axios
      .post("http://localhost:5000/api/users/login", { email: email, password: pass })
      .then(res => {
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Set current user
        history.push("/");
        this.setState({ isLoggedIn: true });

      })
      .catch(err =>
        //login failure - 
        console.log(err)
      );
  }

  setRegister = (e, name, email, pass) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(pass);
    //axios post - login
    axios
      .post("http://localhost:5000/api/users/register", { name: name, email: email, password: pass }).then(res => {
        if(res.data.email){
          alert(res.data.email);
        }else{
          alert("Registration Successful - Please Login");
        }
      })
      .catch(err =>
        //login failure - 
        console.log(err)
      );
  }

  handleDetailsButton = (product) =>{
    this.setState({detailsProduct: product}, ()=>{
      console.log(this.state.detailsProduct);
      this.forceUpdate();
    });
    
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

  componentDidUpdate(prevprops, prevstate){
    if(prevstate.detailsProduct !== this.state.detailsProduct){
      history.push('/products/searchresults/details')
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar searchterm={this.state.searchterm} handleSearchChange={this.handleSearchChange} handleSearchSubmit = {this.handleSearchSubmit} isLoggedIn = {this.state.isLoggedIn}/>
          <Switch>
            <Route path="/login"><Login setLogin={this.setLogin}/></Route>
            <Route path="/register"><Register setRegister={this.setRegister}/></Route>
            <Route path="/account"><Account/></Route>
            <Route path ={["/", "/products", "/products/searchresults"]}><Home searchterm={this.state.searchTerm} products={this.state.foundData} handleDetailsButton={this.handleDetailsButton} detailsProduct={this.state.detailsProduct}/></Route>
            <Route exact path="/products/searchresults/details"><Home searchterm={this.state.searchTerm} products={this.state.foundData} handleDetailsButton={this.handleDetailsButton} detailsProduct={this.state.detailsProduct}/></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;