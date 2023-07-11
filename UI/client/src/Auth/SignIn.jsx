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
                    <h3 className="mb-3">Sign In !</h3>
                    <form>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            className="mb-3"
                            aria-describedby="passwordHelpBlock"
                            placeholder='example@gmail.com'
                        />
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            className="mb-3"
                            aria-describedby="passwordHelpBlock"
                            placeholder='Password'
                        />
                        <p className="text-left float-end text-capitalize"><Link to="/reset-password">Forgot Password?</Link></p>
                        <Button className="mb-3 w-100" variant="primary">Sign In</Button>
                        <p className="m-0 text-center text-capitalize">Don't have an account?&nbsp;<Link to="/sign-up">Create an account </Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;