import React, { Component } from 'react'

class Products extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <div>
                Category: {this.props.category} | 
                SearchTerm: {this.props.searchterm} | 
                City: {this.props.city}
            </div>
        )
    }
}

export default Products