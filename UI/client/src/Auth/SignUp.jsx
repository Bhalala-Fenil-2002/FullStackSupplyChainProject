import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';

function SignIn() {
    return (
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
                        />
                        <Form.Control
                            type="text"
                            className="mb-3"
                            placeholder='Last Name'
                        />
                        <Form.Check
                            inline
                            label="Male"
                            name="gender"
                            type="radio"
                            className="mb-3"
                        />
                        <Form.Check
                            inline
                            label="Female"
                            name="gender"
                            type="radio"
                        />
                        <Form.Control
                            type="email"
                            className="mb-3"
                            placeholder='example@gmail.com'
                        />
                        <Form.Control
                            type="password"
                            className="mb-3"
                            placeholder='Password'
                        />
                        <Button className="mb-3 w-100" variant="primary">Sign In</Button>
                        <p className="m-0 text-center text-capitalize">Have an account?&nbsp;<Link to="/">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;