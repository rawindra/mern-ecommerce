import React, { useEffect, useState } from "react"
import { httpClient } from "../utils/axios"
import Layout from "./Layout"

const Order = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        httpClient.get("/users/order").then((res) => {
            setOrders(res.data.orders)
        })
    }, [])

    return (
        <Layout>
            <div className="container" style={{ minHeight: "77vh" }}>
                <section className="h-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-10 col-xl-8">
                                <div className="card" style={{ borderRadius: "10px" }}>
                                    <div className="card-header px-4 py-5">
                                        <h5 className="text-muted mb-0">Thanks for your Order</h5>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="card shadow-0 border mb-4">
                                            <div className="card-body">
                                                {orders?.map((order: any) => (
                                                    <React.Fragment key={order._id}>
                                                        <>
                                                            {
                                                                order.items.map((item: any) => (
                                                                    <div className="row" key={item._id}>
                                                                        <div className="col-md-2">
                                                                            <img src={`http://localhost:8000/${item.product.image}`}
                                                                                className="img-fluid" />
                                                                        </div>
                                                                        <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0">{item.product.name}</p>
                                                                        </div>
                                                                        <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">
                                                                                {item.variant && Object.entries(item.variant.attribute).map(([key, value]) => {
                                                                                    // Check if value is a string and non-empty
                                                                                    if (typeof value === 'string' && value.trim() !== '') {
                                                                                        return <span key={key}>{`${key}: ${value}`},</span>;
                                                                                    }
                                                                                    return null; // Return null for any other cases
                                                                                })}
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-md-1 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">Qty: {item.quantity}</p>
                                                                        </div>
                                                                        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <p className="text-muted mb-0 small">Rs. {item.price}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </>
                                                        <React.Fragment>
                                                            <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-md-3">
                                                                    <p className="text-muted mb-0 small">Order Status</p>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="d-flex justify-content-around mb-1">
                                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">{order.status}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                                                        </React.Fragment>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    )
}

export default Order