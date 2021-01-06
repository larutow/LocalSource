import React, { useState } from 'react'
import {useHistory, NavLink, useRouteMatch, Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'


function Navbar(props){

    let {path, url} = useRouteMatch();
    
    function handleSearchChange(){
        alert('handlebutton click');
        
        // axios.get('https://jsonplaceholder.typicode.com/users').then((axres) => {
        //   const pull = axres.data;
        //   console.log(pull);
        //   this.setState({ foundData: pull })
        // });
        // this.setState({ searchclick: true });
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/' className="navbar-brand" href="#">LocalSource</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li>
                <Form inline className="my-2 my-lg-0" onSubmit = {props.handleSearchSubmit}>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" value={props.searchterm} onChange={props.handleSearchChange}/>
                <Form.Control as="select">
                <option>Milwaukee</option>
                <option>New York City</option>
                <option>San Francisco</option>
                </Form.Control>
                <Button className="mx-1" type="submit">Search</Button>
                </Form>
                </li>
                    
                
                </ul>
                <NavLink to='/register' className="mr-2">Register</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </div>
        </nav>
    );

}
export default Navbar
