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
                            <Route path='/products/accessories' render={(props) => <Products category="Accessories" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/art' render={(props) => <Products category="Art & Collectibles" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/bags' render={(props) => <Products category="Bags & Purses" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/bath' render={(props) => <Products category="Bath & Beauty" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/media' render={(props) => <Products category="Books, Movies & Music" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/clothing' render={(props) => <Products category="Clothing" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/electronics' render={(props) => <Products category="Electronics & Accessories" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/home' render={(props) => <Products category="Home & Living" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/jewelry' render={(props) => <Products category="Jewelry" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/paperparty' render={(props) => <Products category="Paper & Party Supplies" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/pet' render={(props) => <Products category="Pet Supplies" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/games' render={(props) => <Products category="Toys & Games" handleDetailsButton={this.props.handleDetailsButton}/>} />
                            <Route path='/products/weddings' render={(props) => <Products category="Weddings" handleDetailsButton={this.props.handleDetailsButton}/>} />
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