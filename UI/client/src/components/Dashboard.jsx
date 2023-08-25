import React from 'react';
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import { FaCircleArrowRight, FaCartArrowDown, FaChartColumn } from "react-icons/fa6";
import { FaCartPlus, FaBoxes } from "react-icons/fa";

function Dashboard() {
    
    return (
        <>
            <div className='content-header'>
                <h3>Dashboard</h3>
            </div>
            <section className='content'>
                <Row>
                    <Col>
                        <div className='content-box bg-success'>
                            <h1>52</h1>
                            <p className='box-info'>New Orders</p>
                            <div className='box-icon'>
                                <FaCartPlus size={50} color='#0000005c' />
                            </div>
                            <Link className='content-box-btn'>More Info <FaCircleArrowRight size={18} /> </Link>
                        </div>
                    </Col>
                    <Col>
                        <div className='content-box bg-danger'>
                            <h1>150</h1>
                            <p className='box-info'>Return Oreders</p>
                            <div className='box-icon'>
                                <FaCartArrowDown size={50} color='#0000005c' />
                            </div>
                            <Link className='content-box-btn'>More Info <FaCircleArrowRight /> </Link>
                        </div>
                    </Col>
                    <Col>
                        <div className='content-box bg-warning'>
                            <h1>10%</h1>
                            <p className='box-info'>Sales</p>
                            <div className='box-icon'>
                                <FaChartColumn size={50} color='#0000005c' />
                            </div>
                            <Link className='content-box-btn'>More Info <FaCircleArrowRight size={18} /> </Link>
                        </div>
                    </Col>
                    <Col>
                        <div className='content-box bg-info'>
                            <h1>80%</h1>
                            <p className='box-info'>Inventory</p>
                            <div className='box-icon'>
                                <FaBoxes size={50} color='#0000005c' />
                            </div>
                            <Link className='content-box-btn'>More Info <FaCircleArrowRight size={18} /> </Link>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default Dashboard;