import { Form, Button } from 'react-bootstrap';

function ResetPassword() {
    return (
        <div className="authentication">
            <div className="auth-box">
                <div className="right-box">
                    <img src="images/auth-signin.png" alt="" />
                </div>
                <div className="left-box">
                    <h3 className="mb-3">Reset your password</h3>
                    <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>
                    <form>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            className="mb-3"
                            aria-describedby="passwordHelpBlock"
                            placeholder='example@gmail.com'
                        />
                        <Button className="mt-3 w-100" variant="primary">Reset Password</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;