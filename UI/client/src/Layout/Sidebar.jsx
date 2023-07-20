import { React } from 'react';
import { Link } from "react-router-dom";
import { FaHouse, FaRightFromBracket, FaUserGroup } from "react-icons/fa6";
import { FaCartPlus, FaBoxes } from "react-icons/fa";
import { SiChainlink } from 'react-icons/si';

function SideBar({userData}) {
    return (
        <>
            <div className='sidebar'>
                <div className='brand-link'>
                    <Link path='/'><SiChainlink color='#b5b5b5' size={35} /> &nbsp;Supply Chain</Link>
                </div>
                <div className='sidemenus'>
                    <div className='user-panal'>
                        <div className='user-avatar'>
                            <img src="./images/user_default.jpg" alt="" srcset="" />
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
                            <Link className='menuitem'>
                                <FaUserGroup size={18} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>Client</div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/my-product' className='menuitem'>
                                <FaBoxes size={20} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>My Products</div>
                            </Link>
                        </li>
                        <li>
                            <Link className='menuitem'>
                                <FaCartPlus size={20} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>My Orders</div>
                            </Link>
                        </li>
                        <li>
                            <Link className='menuitem'>
                                <FaRightFromBracket size={18} color='#b5b5b5' className='menu-icon' />
                                <div className='menu-title'>Sign Out</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideBar; 