import React from 'react'

function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">LocalSource</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Product Categories
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Accessories</a>
                    <a class="dropdown-item" href="#">Art & Collectables</a>
                    <a class="dropdown-item" href="#">Bags & Purses</a>
                    <a class="dropdown-item" href="#">Bath & Beauty</a>
                    <a class="dropdown-item" href="#">Books, Movies, & Music</a>
                    <a class="dropdown-item" href="#">Clothing / Apparel</a>
                    <a class="dropdown-item" href="#">Electronics & Accessories</a>
                    <a class="dropdown-item" href="#">Home & Living</a>
                    <a class="dropdown-item" href="#">Jewelry</a>
                    <a class="dropdown-item" href="#">Paper & Party Supplies</a>
                    <a class="dropdown-item" href="#">Pet Supplies</a>
                    <a class="dropdown-item" href="#">Toys & Games</a>
                    <a class="dropdown-item" href="#">Electronics & Accessories</a>
                    <a class="dropdown-item" href="#">Weddings</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Other / Uncategorized</a>
                    </div>
                </li>
           
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Navbar