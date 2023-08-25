import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaRightFromBracket } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='main-header'>
            <ul className='nav-bar'>
                <li className='nav-item'>
                    <Link to='/home' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/my-product' className='nav-link'>My Product</Link>
                </li>
            </ul>
            <ul className='nav-bar ms-auto'>
                <li className=''>
                    <Button variant="secondary" className='h-100'>Sign Out &nbsp;&nbsp;<FaRightFromBracket size={18} color='#fff' className='menu-icon' /></Button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;