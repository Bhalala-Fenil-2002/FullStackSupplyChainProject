import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ProductView() {

    let params = useParams();
    const [productData, setProductData] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:4000/my-product/`, { params: { view: params.id } })
            .then((response) => {
                
                console.log(response.data.message);
                setProductData(response.data.message)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);

    if (!productData || !Object.keys(productData).length) return <p>...loading</p>

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
                                    {
                                        productData.images ?
                                            < img src={"http://localhost:4000/images/my_products/" + productData.images} alt={productData.product} srcSet="" width={'100%'} />
                                            : <img src="/images/product-default.jpg" alt={productData.product} srcSet="" />
                                    }
                                </div>
                                <hr />
                                <div className="product-description">
                                    <p>{productData.details}</p>
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
                                    <td>ID</td>
                                    <td>{productData._id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{productData.product}</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>{productData.brand}</td>
                                </tr>
                                <tr>
                                    <td>General Code</td>
                                    <td>{productData.category}</td>
                                </tr>
                                <tr>
                                    <td>SKUs Code</td>
                                    <td>{productData.skus}</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{productData.price}</td>
                                </tr>
                                <tr>
                                    <td>Qty</td>
                                    <td>{productData.qty}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{productData.status === 1 ? 'Enable' : 'Disabled'}</td>
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