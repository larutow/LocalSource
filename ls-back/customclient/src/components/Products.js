import React, { Component } from 'react'
import axios from 'axios';
import {Card, Button, CardDeck, Row, Col} from 'react-bootstrap'

class Products extends Component {

    constructor(props){
        super(props)
        this.state = {categoryresults:null}
    }

    handleButtonClick = (e,product) =>{
        this.props.handleDetailsButton(product)
    }

    getData(){
        if (this.props.category){
            console.log(this.props.category);
            axios.post('http://localhost:5000/api/products/category', {category: this.props.category})
            .then((response) => {
              console.log(response.data);
              this.setState({categoryresults: response.data.results})
            })
        }

    }

    componentDidMount(){
        this.getData();        
    }
    
    componentDidUpdate(prevProps){
        if(this.props.category !== prevProps.category){
            this.getData();
        }
    } 

    //TODO - remove repetition
    render() {
        if (this.props.products) {
            return (
                <Row>
                    <CardDeck>
                        {this.props.products.searchresults.map((product) => {
                            return (
                                <div className="col-auto mb-3" key={product._id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={product.variants[0].img_url} />
                                        <Card.Body>
                                            <Card.Title>{product.productname}</Card.Title>
                                            <Card.Text>${product.variants[0].price}</Card.Text>
                                            <Button variant="primary" onClick={(e) => this.handleButtonClick(e, product)}>Details</Button>
                                        </Card.Body>
                                    </Card>
                                </div>)
                        })}
                    </CardDeck>
                </Row>
            )

        } else if (this.state.categoryresults) {
            return (
                <Row>
                    <CardDeck>
                        {this.state.categoryresults.map((product) => {
                            return (
                                <div className="col-auto mb-3" key={product._id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={product.variants[0].img_url} />
                                        <Card.Body>
                                            <Card.Title>{product.productname}</Card.Title>
                                            <Card.Text>${product.variants[0].price}</Card.Text>
                                            <Button variant="primary" onClick={(e) => this.handleButtonClick(e, product)}>Details</Button>
                                        </Card.Body>
                                    </Card>
                                </div>)
                        })}
                    </CardDeck>
                </Row>
            )
        } else{
            return (
                <div>Error</div>
            )
        }
    }
}

export default Products