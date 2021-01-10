import React, {useState} from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

function Register(props) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        props.setRegister(e,name, email,pass);
        //push home
    }

    return (
        <Container className = "mt-4">
        <Row>
            <Col xs={3}/>
            <Col xs={6}>
            <Form onSubmit={handleRegisterSubmit}>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="e.g. John Doe or Store Name" value = {name} onChange = {handleNameChange} required/>
                <Form.Text className="text-muted">
                    This may be shared with LocalSource customers
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {handleEmailChange} required/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value = {pass} onChange = {handlePassChange} required/>
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
export default Register