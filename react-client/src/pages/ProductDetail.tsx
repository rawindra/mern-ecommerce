import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductByIdQueryFns } from "../reactQueryFns/queryFns/productQueryFns";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
import { errorToast } from "../utils/helper";
import Layout from "./Layout";

const ProductDetail = () => {
    const [quantity, setQuantity] = useState("1");
    const [selectedVariant, setSelectedVariant] = useState({
        _id: "",
        stock: "",
        attribute: {},
        price: "",
        sku: ""
    });

    const { token } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, setCart, setTotal } = useCartStore();

    const { id } = useParams();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product"],
        queryFn: () => getProductByIdQueryFns(id),
    })

    useEffect(() => {
        if (product?.productType === 'variant') {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    if (isError) {
        errorToast("Cant fetch product");
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    const addToCart = (product: any) => {
        if (!token) {
            return navigate('/login', { replace: true, state: { from: location } });
        }
        if (cart.length > 0) {
            const existingCartItem = cart.find(item => item.sku === selectedVariant.sku);
            if (existingCartItem) {
                return errorToast("Product already in cart");
            }
        }

        const cartItem = {
            product: product,
            quantity: quantity,
            price: product.productType === 'variant' ? selectedVariant.price : product.price,
            variant: product.productType === 'variant' ? selectedVariant : null,
            stock: product.productType === 'variant' ? selectedVariant.stock : product.stock,
            sku: product.productType === 'variant' ? selectedVariant.sku : product.sku
        }

        setCart(cartItem);

        setTotal();

        return toast.success("Product added to cart");
    }

    return (
        <Layout>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-5">
                        <div className="main-img">
                            <img height={"500px"} src={`http://localhost:8000/${product?.image}`} alt="ProductS" />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="main-description px-2">
                            <div className="category text-bold">
                                Category: {product?.category}
                            </div>
                            <div className="product-title text-bold my-2">
                                {product?.name}
                            </div>
                            <div className="price-area my-2">
                                {product.productType !== 'variant' ? (
                                    <p className="new-price text-bold mb-1">Rs {product?.price}</p>
                                ) : (
                                    <p className="new-price text-bold mb-1">{selectedVariant?.price}</p>
                                )}
                            </div>
                            <div className="category text-bold my-2">
                                {product.productType !== 'variant' ? (
                                    <p className="text-bold mb-1">{product.stock ? `${product.stock} stocks` : "Out of Stock"}</p>
                                ) : (
                                    <p className="text-bold mb-1">{selectedVariant?.stock ? `${selectedVariant.stock} stocks` : "Out of Stock"}</p>
                                )}
                            </div>
                            {product.variants && product.variants.length > 0 && (
                                <div className="my-3">
                                    <span className="category text-bold">Variants</span>
                                    {product.variants.map((variant: any) => (
                                        <div key={variant.sku}>
                                            <input
                                                type="radio"
                                                id={variant.sku}
                                                name="variant"
                                                value={variant.sku}
                                                onChange={() => setSelectedVariant(variant)}
                                                checked={selectedVariant.sku === variant.sku}
                                            />
                                            <label htmlFor={variant.sku}>
                                                {variant.attribute.size}, {variant.attribute.color} - Rs {variant.price}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="category text-bold my-3">
                                Quantity
                                <div className="col-md-1 my-1">
                                    <input type="number" className="form-control" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>

                            <div className="buttons d-flex my-5">
                                <div className="block">
                                    <a href="#" className="shadow btn custom-btn ">Wishlist</a>
                                </div>
                                <div className="block">
                                    <button className="shadow btn custom-btn" onClick={() => addToCart(product)}>Add to cart</button>
                                </div>
                            </div>

                        </div>

                        <div className="product-details my-4">
                            <p className="details-title text-color mb-1">Product Details</p>
                            <p className="description">{product?.description}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container similar-products my-4">
                <hr />
                <p className="display-5">Similar Products</p>

                <div className="row">
                    <div className="col-md-3">
                        <div className="similar-product">
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default ProductDetail