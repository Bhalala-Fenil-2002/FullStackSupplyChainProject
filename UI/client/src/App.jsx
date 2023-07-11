import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import ForgotPassword from "./Auth/ForgotPassword";


function App() {
  return (
    <>
      {/* <Link to="/about">About</Link> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={
          <EthProvider>
            <div id="App">
                <div className="container">
                  <Intro />
                  <hr />
                  <Setup />
                  <hr />
                  <Demo />
                  <hr />
                  <Footer />
                </div>
              </div>
          </EthProvider>
        }>
        </Route>
      </Routes>
    </>
  );
}

export default App;
