import React, {useState} from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

function Login(props) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        props.setLogin(e,email,pass);
        //push home
    }

    return (
        <Container className = "mt-4">
        <Row>
            <Col xs={3}/>
            <Col xs={6}>
            <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {handleEmailChange}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value = {pass} onChange = {handlePassChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

            </Col>
            <Col xs={3}/>
        </Row>
        </Container>
        

    )
}

export default Login
