import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <footer className='main-footer'>
            <Container fluid>
                <strong>Copyright © {year} Supply Chain</strong>
                <span>. All rights reserved.</span>
            </Container>
        </footer>
    );
}

export default Footer;