import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';

function ForgotPassword() {
    return (
        <div className="authentication">
            <div className="auth-box">
                <div className="right-box">
                    <img src="images/auth-signin.png" alt="" />
                </div>
                <div className="left-box">
                    <h3 className="mb-3">Create a new password</h3>
                    <form>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            className="mb-4"
                            aria-describedby="passwordHelpBlock"
                            placeholder='New Password'
                        />
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            className="mb-4"
                            aria-describedby="newPasswordHelpBlock"
                            placeholder='Confirm New Password'
                        />
                        <Form.Check
                            inline
                            label="Show Password"
                            className="float-end"
                            type="checkbox"
                        />
                        <Button className="mt-3 w-100" variant="primary">Reset Password</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;