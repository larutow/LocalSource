import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';
import Products from './components/Products';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.state = { searchterm: '' };
  }

  handleSearchChange = event => {
    this.setState({
      searchterm: event.target.value
    });
  }

  handleSearchSubmit = event => {
    if (this.state.searchterm) {
      this.props.history.push({
        pathname:'/products/searchresults',
        searchterm: this.state.searchterm
      });

    }
  }

  render() {
    const searchterm = this.state.searchterm;
    console.log(searchterm);

    return (
      <Router>
        <div className="App">
          <Navbar searchterm={this.state.searchterm} handleSearchChange={this.handleSearchChange} handleSearchSubmit = {this.handleSearchSubmit} />
          <container>
            <div className="row">
              <div className="col-2">
                <Sidenav />
              </div>
              <Switch className="col-10">
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
                <Route path='/products/searchresults' render={(props) => <Products category="" searchterm={this.state.searchterm}/>}></Route>
              </Switch>
            </div>
          </container>
        </div>
      </Router>
    )
  }
}
export default App