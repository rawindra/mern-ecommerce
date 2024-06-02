import { useEffect, useState } from "react"
import Layout from "./Layout"
import { httpClient } from "../utils/axios"
import ProductCard from "../components/ProductCard"
import { useParams } from "react-router-dom";

interface AttributeOption {
    name: string;
}

interface Variant {
    name: string;
    attributeOptions: AttributeOption[];
}

interface SelectedVariant {
    [key: string]: string[];
}

const Shop = () => {
    const [products, setProducts] = useState([])
    const [variants, setVariants] = useState<Variant[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>([]);
    const { id } = useParams();

    useEffect(() => {
        httpClient.get("/category/" + id).then((res) => {
            setProducts(res.data.products)
        }).catch((err) => console.log(err))

        httpClient.get(`/categories/${id}/attributes`).then((res) => {
            setVariants(res.data.category.attributes)
        }).catch((err) => console.log(err))
    }, [id])


    const handleFilter = (e: any, name: any) => {
        const isChecked = e.target.checked;
        const attributeOptionName = e.target.value;

        const variantIndex = selectedVariants.findIndex(variant => variant[name]);
        const variantExists = variantIndex !== -1;

        if (isChecked) {
            if (variantExists) {
                const updatedSelectedVariants = [...selectedVariants];
                updatedSelectedVariants[variantIndex][name].push(attributeOptionName);
                setSelectedVariants(updatedSelectedVariants);
            } else {
                setSelectedVariants(prevState => [...prevState, { [name]: [attributeOptionName] }]);
            }
        } else {
            // If the attributeOption is deselected
            const updatedSelectedVariants = [...selectedVariants];
            const attributeOptionIndex = updatedSelectedVariants[variantIndex][name].indexOf(attributeOptionName);
            updatedSelectedVariants[variantIndex][name].splice(attributeOptionIndex, 1);
            // Remove the variant if no attribute options are selected
            if (updatedSelectedVariants[variantIndex][name].length === 0) {
                updatedSelectedVariants.splice(variantIndex, 1);
            }
            setSelectedVariants(updatedSelectedVariants);
        }

    }

    httpClient.post(`/category/${id}/products`, { variants: selectedVariants }).then((res) => {
        console.log(res.data)
    })

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <h4>Filters</h4>
                        <hr />
                        {variants && variants.map((variant: any, index) => (
                            <div key={index}>
                                <h5>{variant.name}</h5>
                                {variant.attributeOptions.map((attributeOption: any, index: any) => (
                                    <div key={index}>
                                        <input type="checkbox" className="form-check-input" value={attributeOption.name} onClick={(e) => handleFilter(e, variant.name)} />
                                        <label className="form-check-label ms-2" >{attributeOption.name}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            {products && products.map((product: any, index) => (
                                <div className="col-md-4 me-3" key={index}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Shop