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
import PageNotFound from "./Layout/PageNotFound";

// ----- My Category -----
import MyCategory from './components/MyCategory';
import AddCategory from './components/MyCategory/form';

// ----- My Brand ------
import MyBrand from './components/MyBrand';
import AddBrand from './components/MyBrand/form';

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
        <Route path="/add-product/:id?" element={<Layout><AddProduct /></Layout>} />
        <Route path="/view-product/:id" element={<Layout><ViewProduct /></Layout>}></Route>

        {/* My Category */}
        <Route path="/my-category" element={<Layout><MyCategory /></Layout>} />
        <Route path="/add-category/:id?" element={<Layout><AddCategory /></Layout>} />

        {/* My Brand */}
        <Route path="/my-brand" element={<Layout><MyBrand /></Layout>} />
        <Route path="/add-brand/:id?" element={<Layout><AddBrand /></Layout>} />
        
        {/* PageNotFound */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
