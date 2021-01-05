import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import Products from './components/Products';
import { Router, Switch, Route, Link, Redirect, useHistory, withRouter} from "react-router-dom";
import React, { Component } from 'react';
import history from "./history"
import axios from 'axios';
import {Container, Row, Col} from "react-bootstrap";



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
            <Route path = "/" component={Home}/>
          </Switch>
          
          <Container fluid>
            <Row>
              <Col xs={2}>
                <Sidenav />
              </Col>
              <Col xs={10}>
                <Switch>
                  <Route path='/products/accessories' render={(props) => <Products category="accessories" />} />
                  <Route path='/products/art' render={(props) => <Products category="art" />} />
                  <Route path='/products/bags' render={(props) => <Products category="bags" />} />
                  <Route path='/products/bath' render={(props) => <Products category="bath" />} />
                  <Route path='/products/media' render={(props) => <Products category="media" />} />
                  <Route path='/products/clothing' render={(props) => <Products category="clothing" />} />
                  <Route path='/products/electronics' render={(props) => <Products category="electronics" />} />
                  <Route path='/products/home' render={(props) => <Products category="home" />} />
                  <Route path='/products/jewelry' render={(props) => <Products category="jewelry" />} />
                  <Route path='/products/paperparty' render={(props) => <Products category="paperparty" />} />
                  <Route path='/products/pet' render={(props) => <Products category="pet" />} />
                  <Route path='/products/games' render={(props) => <Products category="games" />} />
                  <Route path='/products/weddings' render={(props) => <Products category="weddings" />} />
                  <Route path='/products/other' render={(props) => <Products category="other" />} />
                  <Route path='/products/searchresults' render={(props) => <Products searchterm={this.state.searchterm} products={this.state.foundData}/>}></Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    )
  }
}
export default App;