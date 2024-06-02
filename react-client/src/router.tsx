import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Shop from "./pages/Shop";

const Router = () => (
    <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/register" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/product/:id" Component={ProductDetail}></Route>
        <Route path="/category/:id" Component={Shop}></Route>
        <Route element={<ProtectedRoute />}>
            <Route path="/checkout" Component={Checkout}></Route>
            <Route path="/orders" Component={Order}></Route>
        </Route>
    </Routes>
);

export default Router;
