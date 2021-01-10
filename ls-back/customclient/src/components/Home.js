import React, { Component } from 'react'
import Sidenav from './Sidenav';
import Products from './Products';
import Details from './Details';
import { Switch, Route } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";


class Home extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Sidenav />
                    </Col>
                    <Col xs={10}>
                        <Switch>
                            <Route path='/products/accessories' render={(props) => <Products category="accessories" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/art' render={(props) => <Products category="art" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/bags' render={(props) => <Products category="bags" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/bath' render={(props) => <Products category="bath" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/media' render={(props) => <Products category="media" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/clothing' render={(props) => <Products category="clothing" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/electronics' render={(props) => <Products category="electronics" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/home' render={(props) => <Products category="home" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/jewelry' render={(props) => <Products category="jewelry" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/paperparty' render={(props) => <Products category="paperparty" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/pet' render={(props) => <Products category="pet" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/games' render={(props) => <Products category="games" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/weddings' render={(props) => <Products category="weddings" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/other' render={(props) => <Products category="other" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route exact path='/products/searchresults' render={(props) => <Products searchterm={this.props.searchterm} products={this.props.products} handleDetailsButton={this.props.handleDetailsButton}/>}></Route>
                            <Route exact path='/products/searchresults/details'><Details detailsProduct={this.props.detailsProduct}/></Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Home