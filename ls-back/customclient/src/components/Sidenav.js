import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Sidenav extends Component {
    render() {
        return (
            <nav className="nav flex-column">
                <NavLink to="/products/accessories" className="nav-link">Accessories</NavLink>
                <NavLink to="/products/art" className="nav-link">Art & Collectables</NavLink>
                <NavLink to="/products/bags" className="nav-link">Bags & Purses</NavLink>
                <NavLink to="/products/bath" className="nav-link">Bath & Beauty</NavLink>
                <NavLink to="/products/media" className="nav-link">Books, Movies, & Music</NavLink>
                <NavLink to="/products/clothing" className="nav-link">Clothing / Apparel</NavLink>
                <NavLink to="/products/electronics" className="nav-link">Electronics & Accessories</NavLink>
                <NavLink to="/products/home" className="nav-link">Home & Living</NavLink>
                <NavLink to="/products/jewelry" className="nav-link">Jewelry</NavLink>
                <NavLink to="/products/paperparty" className="nav-link">Paper & Party Supplies</NavLink>
                <NavLink to="/products/pet" className="nav-link">Pet Supplies</NavLink>
                <NavLink to="/products/games" className="nav-link">Toys & Games</NavLink>
                <NavLink to="/products/weddings" className="nav-link">Weddings</NavLink>
                <NavLink to="/products/other" className="nav-link">Other / Uncategorized</NavLink>
            </nav>
        )
    }
}
export default Sidenav;
