import Welcome from "./Welcome";
import Tree from "./Tree";
import Desc from "./Desc";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Intro() {
    let navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:4000/home`, {
                headers: {
                    'authorization': localStorage.getItem('session_id') 
                }
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                if (error.response.data.message === "jwt expired") {
                    navigate("/");
                } else {
                    console.log(error.response.data.message);
                }
            });
    }, []);
    return (
        <>
            <Welcome />
            <Tree />
            <Desc />
        </>
    );
}

export default Intro;
