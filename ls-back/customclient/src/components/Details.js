import React from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import he from 'he'

function Details(props) {
    
    return (
        <div>
            <Row>
            <Col xs={1}></Col>
            <Col xs={4}><img src={props.detailsProduct.variants[0].img_url}/></Col>
            <Col xs={2}></Col>
            <Col xs={4}>
            <ListGroup>
                <ListGroup.Item>{props.detailsProduct.productname}</ListGroup.Item>
                <ListGroup.Item>{he.decode(props.detailsProduct.variants[0].description)}</ListGroup.Item>
                <ListGroup.Item>Price: ${props.detailsProduct.variants[0].price}</ListGroup.Item>
                <ListGroup.Item>Link To Source - Placeholder</ListGroup.Item>
            </ListGroup>
                
            </Col>
            <Col xs={1}></Col>
            </Row>
            <Row>
                <Col xs={2}></Col>
                <Col xs={8}>
                    <Row>Shop Details</Row>
                    <Row>Shop Wesbite</Row>
                    <Row>Shop Address</Row>
                    <Row>Shop Google Map</Row>
                </Col>
                <Col xs={2}></Col>
            </Row>

            {JSON.stringify(props.detailsProduct)}
        </div>
    )
}
export default Details
