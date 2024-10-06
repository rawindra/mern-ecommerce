import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getProductQueryFns } from "../reactQueryFns/queryFns/productQueryFns";
import { errorToast } from "../utils/helper";
import Layout from "./Layout";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "../utils/axios";

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        httpClient.get("/categories").then((res) => {
            setCategories(res.data.categories)
        }).catch((err) => console.log(err))
    }, [])

    const { data: products, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProductQueryFns,
    })

    if (isError) {
        errorToast("Cant fetch products");
    }


    return (
        <Layout>
            <h3 className="text-center mb-4 text-uppercase">Shop By Categories</h3>
            <div className="row">
                {categories && categories.map((category: any, index) => (
                    <div className="col-md-3" key={index}>
                        <Link to={`/category/${category._id}`} key={index} style={{ textDecoration: 'none' }}>
                            <Card style={{ width: '18rem', height: '10rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Card.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Card.Title>{category.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
            <h3 className="text-center m-4 text-uppercase">Shop By Products</h3>
            <div className="row">
                {products?.map((product: any) => (
                    <div className="col-md-3" key={product._id}>
                        <ProductCard product={product} key={product._id} />
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Home