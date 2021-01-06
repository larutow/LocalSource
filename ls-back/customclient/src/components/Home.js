import React, { Component } from 'react'
import Sidenav from './Sidenav';
import Products from './Products';
import { Switch, Route } from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";


class Home extends Component {
    render(props) {
        return (
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
                            <Route path='/products/searchresults' render={(props) => <Products searchterm={this.props.searchterm} products={this.props.products} />}></Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Home