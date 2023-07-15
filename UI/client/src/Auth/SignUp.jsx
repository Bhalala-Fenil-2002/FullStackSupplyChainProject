import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function SignIn() {
    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    let UserData = {
        "fname": fname,
        "lname": lname,
        "gender": gender,
        "email": email,
        "password": password
    };

    const successNotify = (messageSucc) => toast.success(messageSucc, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const errorNotify = (messageErr) => toast.error(messageErr, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const UserRegister = async () => {
        await axios
            .post(`http://localhost:4000/signup`, UserData)
            .then((res) => {
                successNotify(res.data.message);
                navigate("/");
            })
            .catch((error) => {
                errorNotify(error.response.data.message);
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="authentication">
                <div className="auth-box">
                    <div className="right-box">
                        <img src="images/auth-signin.png" alt="" />
                    </div>
                    <div className="left-box">
                        <h3 className="mb-3">Sign UP !</h3>
                        <form>
                            <Form.Control
                                type="text"
                                className="mb-3"
                                placeholder='First Name'
                                onChange={(fname) => setFname(fname.target.value)}
                                value={fname}
                            />
                            <Form.Control
                                type="text"
                                className="mb-3"
                                placeholder='Last Name'
                                onChange={(lname) => setLname(lname.target.value)}
                                value={lname}
                            />
                            <Form.Check
                                inline
                                label="Male"
                                name="gender"
                                type="radio"
                                className="mb-3"
                                value={'Male'}
                                onChange={(gender) => setGender(gender.target.value)}
                            />
                            <Form.Check
                                inline
                                label="Female"
                                name="gender"
                                type="radio"
                                value={'Female'}
                                onChange={(gender) => setGender(gender.target.value)}
                            />
                            <Form.Control
                                type="email"
                                className="mb-3"
                                placeholder='example@gmail.com'
                                onChange={(email) => setEmail(email.target.value)}
                                value={email}
                            />
                            <Form.Control
                                type="password"
                                className="mb-3"
                                placeholder='Password'
                                onChange={(password) => setPassword(password.target.value)}
                                value={password}
                            />
                            <Button className="mb-3 w-100" variant="primary" onClick={UserRegister}>Sign In</Button>
                            <p className="m-0 text-center text-capitalize">Have an account?&nbsp;<Link to="/">Sign In</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;