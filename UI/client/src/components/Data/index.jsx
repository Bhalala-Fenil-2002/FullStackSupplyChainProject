import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaEye, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import axios from 'axios';
import { Table } from 'react-bootstrap';

function DataTable({ dataGetter }) {
    const navigate = useNavigate()
    const [myproduct, setMyproduct] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getProducts = (page) => {
        axios.get(`http://localhost:4000/${dataGetter.get}?page=${page}`)
            .then((response) => {
                setMyproduct(response.data.message)
                setDataCount(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handlePageChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    }

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage]);

    const UpdateProduct = (id) => {
        return navigate(`/${dataGetter.post}/` + id)
    }

    const DeleteProduct = (id) => {
        axios.get(`http://localhost:4000/${dataGetter.delete}/`, { params: { delete: id } })
            .then((response) => {
                getProducts(currentPage);
            }).catch((error) => {
                console.log(error.message);
            })
    }

    const ViewProduct = (id) => {
        return navigate(`/${dataGetter.view}/` + id)
    }
    console.log(Math.ceil(dataCount / 5))

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        {
                            dataGetter.TableCol.map((val, key) => {
                                return <th key={key} style={{ textTransform: 'capitalize' }}>{val}</th>
                            })
                        }
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (myproduct.length ? myproduct.map((val, inx) => {
                            return <tr key={inx}>
                                <td>{inx + 1}</td>
                                {
                                    dataGetter.TableCol.map((filed_val, filed_key) => {
                                        return <td key={filed_key} className={filed_val === 'image' ? 'table-img' : ''} > {filed_val === 'image' ? <img src={'http://localhost:4000/images/my_products/' + val['images']} alt={val['product']} srcSet="" width="100%" /> : val[filed_val]}</td>
                                    })
                                }
                                <td className='action-col'>
                                    <button className='btn btn-secondary' onClick={() => UpdateProduct(val._id)}><FaPenToSquare size={20} /></button>&nbsp;&nbsp;
                                    <button type='button' className='btn btn-danger' onClick={() => DeleteProduct(val._id)}><FaTrashCan /></button>&nbsp;&nbsp;
                                    <button type='button' className='btn btn-success' onClick={() => ViewProduct(val._id)}><FaEye size={23} /></button>
                                </td>
                            </tr>
                        }) : <tr>
                            <td colSpan={9} className='text-center text-danger not-found-data'>Not Found</td>
                        </tr>)
                    }
                </tbody>
            </Table>
            <div className='footer-pagination'>
                <ul className='paginations d-flex justify-content-end'>
                    {
                        dataCount > 5 && Array.apply(null, Array(Math.ceil(dataCount / 5))).map((val, key) => {
                            return <li className={`pages-item ${currentPage == (key + 1) ? 'active' : ''}`} onClick={() => handlePageChange(key + 1)}>{key + 1}</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default DataTable;