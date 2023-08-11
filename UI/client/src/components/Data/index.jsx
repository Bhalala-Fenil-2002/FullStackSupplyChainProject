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
    const [serachRes, setserachRes] = useState('');

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage, serachRes]);

    const getProducts = (page) => {
        axios.get(`http://localhost:4000/${dataGetter.get}?search=${serachRes}&page=${page}`)
            .then((response) => {
                setMyproduct(response.data.message)
                setDataCount(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


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


    // if (!myproduct || !Object.keys(myproduct).length) return <p>...loading</p>
    console.log(dataGetter.TableCol.length + 2);
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-3">
                    <input type="text" id="" className='form-control border-secondary' value={serachRes} placeholder='Searching...' onChange={(serch) => setserachRes(serch.target.value)} />
                </div>
            </div>
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
                    {/* {(myproduct && !Object.keys(myproduct).length ? <tr><td className='data-loader' colSpan={dataGetter.TableCol.length + 2}>Loading...</td></tr> : '')} */}
                    {
                        (myproduct.length ? myproduct.map((val, inx) => {
                            return <tr key={inx}>
                                <td>{inx + 1}</td>
                                {
                                    dataGetter.TableCol.map((filed_val, filed_key) => {
                                        if (filed_val === "brand" && typeof val[filed_val] !== "string" && val[filed_val].length) {
                                            return <td key={filed_key}>{val[filed_val].length ? val[filed_val].map((el) => el.brand).join(', ') : ""}</td>
                                        } else if (filed_val === 'image') {
                                            return <td key={filed_key} className={filed_val === 'image' ? 'table-img' : ''} ><img src={'http://localhost:4000/images/my_products/' + val['images']} alt={val['product']} srcSet="" width="100%" /></td>
                                        } else {
                                            return <td key={filed_key} >{val[filed_val]}</td>
                                        }

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