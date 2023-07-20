import React from 'react';
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { FaCirclePlus } from "react-icons/fa6";


function MyProduct() {
    return (
        <>
            <div className='content-header'>
                <h1>My Product</h1>
                <Link className='btn btn-secondary' to={'/add-product'}><FaCirclePlus color='#fff' size={18} />&nbsp;&nbsp;Add Product</Link>
            </div>
            <section className='content'>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>Duo</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>Duo</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>Duo</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='footer-pagination'>
                    <ul className='paginations d-flex justify-content-end'>
                        <li className='pages-item'>
                            <Link className='pages-link bg-secondary text-white'>1</Link>
                        </li>
                        <li className='pages-item'>
                            <Link className='pages-link'>2</Link>
                        </li>
                        <li className='pages-item'>
                            <Link className='pages-link'>3</Link>
                        </li>
                        <li className='pages-item'>
                            <Link className='pages-link'>4</Link>
                        </li>
                        <li className='pages-item'>
                            <Link className='pages-link'>5</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default MyProduct;