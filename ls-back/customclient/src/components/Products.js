import React, { Component } from 'react'
import axios from 'axios';

class Products extends Component {

    render() {
        if(this.props.products.length > 0){
            return (
                <div>
                    Category: {this.props.category} | 
                    SearchTerm: {this.props.searchterm} | 
                    City: {this.props.city}
                    <ul>
                        
                        {
                            this.props.products.map(function(product){
                            return <li>{product}</li>;
                        })}
                    </ul>
                </div>
            )
        }
        else{
            <div>
                    Category: {this.props.category} | 
                    SearchTerm: {this.props.searchterm} | 
                    City: {this.props.city}
                </div>
        }
        
    }
}

export default Products