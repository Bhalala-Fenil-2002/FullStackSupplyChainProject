import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";

function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    let UserData = {
        "email": email,
        "password": password
    };    

    const UserLogin = async () => {
        await axios
            .post(`http://localhost:4000/signin`, UserData)
            .then((res) => {
                localStorage.setItem('session_id', res.data.token);
                if (res.data.status === 200) {
                    navigate("/home");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="authentication">
            <div className="auth-box">
                <div className="right-box">
                    <img src="images/auth-signin.png" alt="" />
                </div>
                <div className="left-box">
                    <h3 className="mb-3">Sign In !</h3>
                    <form>
                        <Form.Control
                            type="text"
                            className="mb-3"
                            placeholder='example@gmail.com'
                            onChange={(email) => setEmail(email.target.value)}
                            value={email}
                        />
                        <Form.Control
                            type="password"
                            className="mb-1"
                            placeholder='Password'
                            onChange={(password) => setPassword(password.target.value)}
                            value={password}
                        />
                        <p className="text-left float-end text-capitalize mb-3"><Link to="/reset-password">Forgot Password?</Link></p>
                        <Button className="mb-3 w-100" variant="primary" onClick={UserLogin}>Sign In</Button>
                        <p className="m-0 text-center text-capitalize">Don't have an account?&nbsp;<Link to="/sign-up">Create an account </Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;