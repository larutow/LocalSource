import React, {useEffect, useState} from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import he from 'he'
import axios from 'axios'

function Details(props) {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        axios.post('http://localhost:5000/api/users/getprofiledetails', {profile_id: props.detailsProduct.variants[0].profile_id})
            .then((response) => {
              setProfile(response.data);
            })
    }, [setProfile]);


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
                <a href={props.detailsProduct.variants[0].origin_url}><ListGroup.Item>Link To Source</ListGroup.Item></a>
            </ListGroup>
                
            </Col>
            <Col xs={1}></Col>
            </Row>
            <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                <Row><h3>Shop Details:</h3></Row>
                    <Row>Shop Details: Placeholder</Row>
                    <Row>Shop Website: <a href={profile.shopUrl}>{profile.shopUrl||"n/a"}</a></Row>
                    <Row>Shop Address: {profile.shopAddress||"n/a"}</Row>
                    <Row>Shop Lng: Placeholder</Row>
                    <Row>Shop Lng: Placeholder</Row>
                    <Row>Shop Google Map: Placeholder</Row>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </div>
    )
}
export default Details
