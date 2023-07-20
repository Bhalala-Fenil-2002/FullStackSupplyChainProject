import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function ProductView() {
    return (
        <>
            <div className='content-header'>
                <h1>View</h1>
                <Link className='btn btn-secondary' to={'/my-product'}><FaCircleArrowLeft color='#fff' size={18} />&nbsp;&nbsp;Back</Link>
            </div>

            <section className='content mb-4'>
                <Row>
                    <Col md='3'>
                        <Card>
                            <div className='product-info-left'>
                                <div className='product-info-img'>
                                    <img src="./images/product-default.jpg" alt="" srcset="" />
                                </div>
                                <hr />
                                <div className="product-description">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col>
                        <Table bordered className='product-info-table'>
                            <thead>
                                <tr>
                                    <th>Titale</th>
                                    <th className='table-description'>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#</td>
                                    <td>0102</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>Demo</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>Demo 2</td>
                                </tr>
                                <tr>
                                    <td>General Code</td>
                                    <td>Demo 2</td>
                                </tr>
                                <tr>
                                    <td>SKUs Code</td>
                                    <td>PRO-XX000-XX</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>12$</td>
                                </tr>
                                <tr>
                                    <td>Qty</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>Enable</td>
                                </tr>
                                <tr>
                                    <td>How many Orders?</td>
                                    <td>150</td>
                                </tr>
                                <tr>
                                    <td>Review</td>
                                    <td>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default ProductView;