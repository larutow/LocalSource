import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

function Navbar(props){

    const [searchTerm, setSearchTerm] = useState('')
    
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">LocalSource</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li>
                <form className="form-inline my-2 my-lg-0" onSubmit = {props.handleSearchSubmit}>
                <input className="form-control mr-sm-2" type="text" placeholder="Search" value={props.searchterm} onChange={props.handleSearchChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
                </form>
                </li>
                    
                
                </ul>
                <a className="nav-link" href="#">Register</a>
            </div>
        </nav>
    );

}
export default Navbar
