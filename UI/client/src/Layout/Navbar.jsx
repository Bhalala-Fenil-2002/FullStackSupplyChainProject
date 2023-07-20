import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='main-header'>
            <Container fluid>
                <ul className='nav-bar'>
                    <li className='nav-item'>
                        <Link to='/home' className='nav-link'>Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/my-product' className='nav-link'>My Product</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar;