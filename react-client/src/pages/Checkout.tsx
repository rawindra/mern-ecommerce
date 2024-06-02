import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useCartStore from "../store/useCartStore";
import { httpClient } from "../utils/axios";
import { createdToast } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

type CheckoutFormData = {
    phoneNumber: string;
    shippingAddress: string;
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
        phoneNumber: yup.string().required("phoneNumber is required"),
        shippingAddress: yup.string().required("shippingAddress is required"),
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

        httpClient.post("/users/order/create", data)
            .then(() => {
                createdToast("Order");
            })
            .catch((err) => console.log(err))

        navigate("/orders");
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
                        {cart.map((item: any, index) => (
                            <div key={index} className="d-flex gap-2 mb-2 align-items-center">
                                <img height={"100px"} width={"100px"} src={`http://localhost:8000/${item.product.image}`} alt="" />
                                <p>{item.product.name}</p>
                                <p>{item.quantity}</p>
                                <p>{item.price}</p>
                            </div>
                        ))}
                        <span>{total}</span>
                    </div>
                    <button className="btn btn-success">Place Order</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout