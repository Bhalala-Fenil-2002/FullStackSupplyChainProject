import React from 'react';
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { FaCircleArrowLeft, FaCirclePlus, FaPenToSquare } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function AddProduct() {
    return (
        <>
            <div className='content-header'>
                <h1>Add Product</h1>
                <Link className='btn btn-secondary' to={'/my-product'}><FaCircleArrowLeft color='#fff' size={18} />&nbsp;&nbsp;Back</Link>
            </div>

            <section className='content mb-4'>
                <Card>
                    <Card.Body className='p-3 border-2 border-secondary-subtle'>
                        <Form>
                            <div for="product-img" className='product-images'>
                                <img src="./images/product-default.jpg" alt="" srcset="" />
                                <label className='product-img-icon'>
                                    <FaPenToSquare size={22} color='#e3e3e3' className='icon' />
                                    <input id='product-img' type="file" name="" accept="image/png, image/jpeg" />
                                </label>
                            </div>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter product name" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Product Category</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select Category</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Product Price</Form.Label>
                                    <InputGroup>
                                        <Form.Control aria-label="Product Price" placeholder='00.0' />
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Product Quantity</Form.Label>
                                    <InputGroup>
                                        <Form.Control aria-label="Product Price" value={10}/>
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Product SKUs Code</Form.Label>
                                    <InputGroup>
                                        <Form.Control placeholder='SKUs (PRO-XX0000XX)' disabled readOnly/>
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                    <Form.Label>Product Code</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control placeholder="XXX-XXXXX-XX" disabled readOnly />
                                        <Button variant="secondary" id="button-addon2">Generate</Button>
                                    </InputGroup>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Product details</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder='Product details...'/>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <p className='mt-3 mb-1'>Product Status</p>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="secondary">Disabled</Button>
                                        <Button variant="secondary" disabled>Enabled</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <div className='form-footer'>
                                <Button variant="secondary" type="submit" className='float-lg-end px-4'><FaCirclePlus />&nbsp;&nbsp;Add</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </section>
        </>
    );
}

export default AddProduct; 