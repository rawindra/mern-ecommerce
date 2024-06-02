import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getProductQueryFns } from "../reactQueryFns/queryFns/productQueryFns";
import { errorToast } from "../utils/helper";
import Layout from "./Layout";

const Home = () => {
    const { data: products, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProductQueryFns,
    })

    if (isError) {
        errorToast("Cant fetch products");
    }


    return (
        <Layout>
            <div className="row d-flex gap-2">
                {products?.map((product: any) => (
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>
        </Layout>
    )
}

export default Home