import { React } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaCubes, FaCubesStacked, FaHouse, FaRightFromBracket, FaTags, FaUserGroup } from "react-icons/fa6";
import { FaCartPlus, FaBoxes } from "react-icons/fa";
import { SiChainlink } from 'react-icons/si';

function SideBar({ userData }) {

    let navigate = useNavigate();
    const SignOut = () => {
        localStorage.removeItem('session_id');
        navigate("/");
    }

    return (
        <>
            <div className='sidebar'>
                <div className='brand-link'>
                    <Link path='/'><SiChainlink color='#b5b5b5' size={35} /> &nbsp;Supply Chain</Link>
                </div>
                <div className='sidemenus'>
                    <div className='user-panal'>
                        <div className='user-avatar'>
                            <img src="/images/user_default.jpg" alt="" srcSet="" />
                        </div>
                        <div className='user-info'>
                            <Link path='/'>{userData.fname + " " + userData.lname}</Link>
                        </div>
                    </div>
                    <ul className='sidemenu'>
                        <li className='active'>
                            <Link to='/home' className='menuitem'>
                                <FaHouse size={18} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>Dashboard</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/my-brand' className='menuitem'>
                                <FaTags size={20} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>My Brand</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/my-category' className='menuitem'>
                                <FaCubesStacked size={20} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>My Category</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/my-product' className='menuitem'>
                                <FaCubes size={20} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>My Products</div>
                            </Link>
                        </li>
                        <li>
                            <Link className='menuitem'>
                                <FaUserGroup size={18} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>Client</div>
                            </Link>
                        </li>
                        <li>
                            <Link className='menuitem'>
                                <FaCartPlus size={20} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>My Orders</div>
                            </Link>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='menuitem' onClick={SignOut}>
                                <FaRightFromBracket size={18} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>Sign Out</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar; 