import React, { Component } from 'react'
import axios from 'axios';
import {Card, Button} from 'react-bootstrap'

class Products extends Component {

    render() {
        if (this.props.products) {
            return (
                <div>
                    {this.props.products.searchresults.map(function (product) {
                        return (
                            <>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={product.variants[0].img_url} />
                                    <Card.Body>
                                        <Card.Title>{product.productname}</Card.Title>
                                        <Card.Text>
                                            placeholder - Price</Card.Text>
                                        <Button variant="primary">Details</Button>
                                    </Card.Body>
                                </Card>
                                {JSON.stringify(product)}
                            </>)
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