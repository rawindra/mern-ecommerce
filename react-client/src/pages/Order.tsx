import { useEffect } from "react"
import { httpClient } from "../utils/axios"

const Order = () => {
    useEffect(() => {
        httpClient.get("/users/order").then((res) => {
            console.log(res.data)
        })
    }, [])

    return (
        <div>Order</div>
    )
}

export default Order