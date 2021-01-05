import React, { Component } from 'react'
import axios from 'axios';

class Products extends Component {

    render() {
        if(this.props.products){
            return(
                <div>
                    {this.props.products.map(function(product){
                        return <p>{JSON.stringify(product)}</p>;
                    })}
                </div>
            )

        }else{
            return (
                <div>
                    Category: {this.props.category} |
                    SearchTerm: {this.props.searchterm} |
                    City: {this.props.city}
    
                </div>
            )
        }
    }
}

export default Products