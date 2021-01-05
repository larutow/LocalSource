import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Nav} from 'react-bootstrap';

class Sidenav extends Component {
    render() {
        return (
            <Nav className="flex-column">
                <Nav.Item><NavLink to="/products/accessories" className="nav-link">Accessories</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/art" className="nav-link">Art & Collectables</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/bags" className="nav-link">Bags & Purses</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/bath" className="nav-link">Bath & Beauty</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/media" className="nav-link">Books, Movies, & Music</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/clothing" className="nav-link">Clothing / Apparel</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/electronics" className="nav-link">Electronics & Accessories</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/home" className="nav-link">Home & Living</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/jewelry" className="nav-link">Jewelry</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/paperparty" className="nav-link">Paper & Party Supplies</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/pet" className="nav-link">Pet Supplies</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/games" className="nav-link">Toys & Games</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/weddings" className="nav-link">Weddings</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/other" className="nav-link">Other / Uncategorized</NavLink></Nav.Item>
            </Nav>
        )
    }
}
export default Sidenav;
