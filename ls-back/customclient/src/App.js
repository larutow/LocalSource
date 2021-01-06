import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Router, Switch, Route, Link, Redirect, useHistory, withRouter} from "react-router-dom";
import React, { Component } from 'react';
import history from "./history"
import axios from 'axios';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';



class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = { searchterm: '', searchclick:null, foundData:null};
  }

  handleSearchChange = event => {
    this.setState({
      searchterm: event.target.value
    });
  }

  handleSearchSubmit = (e, searchTerm) => {
    alert('HandleSearchSubmit function in app.js');

    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      console.log(response.data);
      this.setState({foundData: response.data});
    });

    history.push('/products/searchresults');
    e.preventDefault();
  }

  render() {
    const searchterm = this.state.searchterm;
    console.log(searchterm);
    return (
      <Router history={history}>
        <div className="App">
          <Navbar searchterm={this.state.searchterm} handleSearchChange={this.handleSearchChange} handleSearchSubmit = {this.handleSearchSubmit} />
          <Switch>
            <Route path="/login"><Login/></Route>
            <Route path="/register"><Register/></Route>
            <Route path ={["/", "/products"]}><Home searchterm={this.state.searchTerm} products={this.state.foundData}/></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;