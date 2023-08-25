import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from 'react-bootstrap';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { EthProvider } from "../contexts/EthContext";
import Footer from "./Footer";

function Intro({ children }) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        axios
            .get(`http://localhost:4000/home`, {
                headers: {
                    'authorization': localStorage.getItem('session_id')
                }
            })
            .then((res) => {
                setUserData({
                    fname: res.data.message.fname,
                    lname: res.data.message.lname
                })
            })
            .catch((error) => {
                if (error.response.data.status === 400) {
                    navigate("/");
                } else {
                    console.log(error.response.data);
                }
            });
    }, []);

    return (
        // <EthProvider>
            <div className="wrapper">
                <Navbar />
                <Sidebar userData={userData} />
                <div className='content-wrapper'>
                    <Container fluid>
                        {children}
                    </Container>
                </div>
                <Footer />
            </div>
        // </EthProvider>
    );
}

export default Intro;
