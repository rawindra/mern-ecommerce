import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";



const Navbar = () => {
    const navigate = useNavigate();

    const { cart, total, setTotal, remove } = useCartStore();

    const logout = () => {
        localStorage.removeItem("auth")
        navigate("/")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeItem = (index: any) => {
        remove(index)
        setTotal();
    }

    return (
        <>
            <div className="container mt-4 d-flex justify-content-between">
                <div className="d-flex gap-2">
                    <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                    <CategoryDropdown />
                </div>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-primary position-relative" onClick={handleShow}>
                        Cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cart.length}
                            <span className="visually-hidden">cart items</span>
                        </span>
                    </button>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart Items</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.map((item: any, index) => (
                        <div key={index} className="d-flex gap-2 mb-2 align-items-center">
                            <img height={"100px"} width={"100px"} src={`http://localhost:8000/${item.product.image}`} alt="" />
                            <p>{item.product.name}</p>
                            <p>{item.quantity}</p>
                            <p>{item.price}</p>
                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>Remove</button>
                        </div>
                    ))}
                    <span>{total}</span>
                    <button className="btn btn-primary" onClick={() => navigate("/checkout")}>Checkout</button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Navbar