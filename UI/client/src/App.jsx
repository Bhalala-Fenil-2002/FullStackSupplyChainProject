import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// ----- Auth ---- 
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import ForgotPassword from "./Auth/ForgotPassword";

// ----- Dashboard ---- 
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";

// ----- My Product ---- 
import MyProduct from './components/MyProduct';
import AddProduct from './components/MyProduct/form';
import ViewProduct from './components/MyProduct/view';

function App() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/home" element={<Layout><Dashboard /></Layout>}></Route>

        {/* My Product */}
        <Route path="/my-product" element={<Layout><MyProduct /></Layout>} />
        <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
        <Route path="/view-product" element={<Layout><ViewProduct/></Layout>}></Route>
      </Routes>
    </>
  );
}

export default App;
