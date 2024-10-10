import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";
import { Container, Nav, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { FaCartPlus, FaSkullCrossbones } from "react-icons/fa";
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { FaPowerOff } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();

    const { cart, updateQuantity, total, setTotal, remove } = useCartStore();

    const auth = localStorage.getItem("auth");

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

    const handleQuantityChange = (index: number, newQuantity: number) => {
        updateQuantity(index, newQuantity);
        setTotal();
    };

    return (
        <>
            <BootstrapNavbar
                data-bs-theme="light" >
                <Container className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                        <BootstrapNavbar.Brand>
                            <Link to="/" className="banner text-white" style={{ textDecoration: 'none' }}>NIRVANA</Link>
                        </BootstrapNavbar.Brand>
                    </div>
                    <Nav>
                        <div className="d-flex gap-2">
                            {auth && <Link to="/orders" className="btn btn-link text-white text-decoration-none">Orders</Link>}
                            <button type="button" className="btn btn-link position-relative" onClick={handleShow}>
                                <FaCartPlus className="text-white" />
                                <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger" style={{ top: "8px" }}>
                                    {cart.length}
                                    <span className="visually-hidden">cart items</span>
                                </span>
                            </button>
                            {auth
                                ?
                                <button className="btn btn-link" onClick={logout}><FaPowerOff className="text-danger" onClick={logout} /></button>
                                :
                                <button className="btn btn-link" onClick={() => navigate("/login")}>Login</button>
                            }

                        </div>
                    </Nav>
                </Container>
            </BootstrapNavbar>
            <Offcanvas style={{ width: "500px" }} show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart Items</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {cart.map((item: any, index) => (
                        <div className="row mb-4" key={index}>
                            <div key={index} className="col-md-3">
                                <img height={"100px"} width={"100px"} src={`http://localhost:8000/${item.product.image}`} alt="" />
                            </div>
                            <div className="col-md-8 d-flex flex-column">
                                <span className="text-bold">{item.product.name}</span>
                                <div>
                                    {item.variant && Object.entries(item.variant.attribute).map(([key, value]) => {
                                        // Check if value is a string and non-empty
                                        if (typeof value === 'string' && value.trim() !== '') {
                                            return <span key={key}>{`${key}: ${value}`},</span>;
                                        }
                                        return null; // Return null for any other cases
                                    })}
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <span className="text-secondary">Rs. {item.price}/pc</span>
                                    <input type="number" className="form-control w-25" min="1" max={item.stock} value={item.quantity} onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} />
                                </div>
                            </div>
                            <div className="col-md-1 align-self-center">
                                <FaSkullCrossbones className="text-danger" onClick={() => removeItem(index)} />
                            </div>
                        </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-bold">Total </span>
                        <span>Rs. {total}</span>
                    </div>
                    <button className="w-100 text-center btn btn-secondary text-bold text-uppercase text-white" onClick={() => navigate("/checkout")}>Checkout</button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Navbar