import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useCartStore from "../store/useCartStore";
import { httpClient } from "../utils/axios";
import { createdToast } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import Layout from "./Layout";

type CheckoutFormData = {
    fullName: string;
    phoneNumber: string;
    shippingAddress: string;
    paymentMethod: string;
    items?: any;
    total?: number;
}

const Checkout = () => {

    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    })
    const { cart, total } = useCartStore();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        fullName: yup.string().required("fullName is required"),
        phoneNumber: yup.string().required("phoneNumber is required"),
        shippingAddress: yup.string().required("shippingAddress is required"),
        paymentMethod: yup.string().required("paymentMethod is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: CheckoutFormData) => {
        data.items = cart;
        data.total = total;

        console.log(data);

        httpClient.post("/users/order/create", data)
            .then(() => {
                createdToast("Order");
            })
            .catch((err) => console.log(err))

        navigate("/orders");
    };

    return (
        <Layout>
            <div className="container" style={{ height: "77vh" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Fullname</label>
                                <input type="text" className="form-control" {...register("fullName")} />
                                <p className="text-danger">{errors.fullName?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Phone Number</label>
                                <input type="text" className="form-control" {...register("phoneNumber")} />
                                <p className="text-danger">{errors.phoneNumber?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Shipping Address</label>
                                <input type="numnber" className="form-control" {...register("shippingAddress")} />
                                <p className="text-danger">{errors.shippingAddress?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Patment Method</label>
                                <select className="form-control" {...register("paymentMethod")}>
                                    <option value="cod">Cash On Delivery</option>
                                </select>
                                <p className="text-danger">{errors.paymentMethod?.message}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
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
                                            <span className="text-secondary">Rs. {item.price} x {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-bold">Total </span>
                                <span>Rs. {total}</span>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success">Place Order</button>
                </form>
            </div>
        </Layout>
    )
}

export default Checkout