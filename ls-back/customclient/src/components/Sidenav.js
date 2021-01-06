import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Nav} from 'react-bootstrap';

const selectedStyle = {
    backgroundColor: "#343a40",
    color: "#f7f7f7"
}

const defaultStyle = {
    color: "#343a40"
}

class Sidenav extends Component {
    render() {
        return (
            <Nav className="flex-column">
                <Nav.Item><NavLink to="/products/accessories" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Accessories</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/art" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Art & Collectables</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/bags" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Bags & Purses</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/bath" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Bath & Beauty</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/media" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Books, Movies, & Music</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/clothing" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Clothing / Apparel</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/electronics" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Electronics & Accessories</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/home" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Home & Living</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/jewelry" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Jewelry</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/paperparty" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Paper & Party Supplies</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/pet" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Pet Supplies</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/games" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Toys & Games</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/weddings" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Weddings</NavLink></Nav.Item>
                <Nav.Item><NavLink to="/products/other" className="nav-link" style={defaultStyle} activeStyle={selectedStyle}>Other / Uncategorized</NavLink></Nav.Item>
            </Nav>
        )
    }
}
export default Sidenav;
