import { Button, Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Banner from "../../components/shared/Banner/Banner";
import Layout from "../../components/shared/Layout";
import { getAttributesQueryFns } from "../../reactQueryFns/queryFns/attributesQueryFns";
import { createdToast, errorToast } from "../../utils/helper";
import { httpClient } from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

const CategoryVariantAssign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: attributes } = useQuery({
        queryKey: ["attributes"],
        queryFn: getAttributesQueryFns
    });

    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [category, setCategory] = useState<any>();

    useEffect(() => {
        httpClient.get(`/categories/${id}`).then((res) => {
            setCategory(res.data.category);
            setSelectedAttributes(res.data.category.attributes);
        })
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (selectedAttributes.length === 0) {
            errorToast("Please select at least one attribute");
        }

        httpClient.post(`/categories/assign-variants/${id}`, { attributes: selectedAttributes }).then(() => {
            createdToast("Variants");
            navigate(`/admin/categories`);
        }).catch(() => {
            errorToast("Something went wrong. Please try again");
        })
    }

    const handleClick = (e: any) => {
        if (selectedAttributes.includes(e.target.value)) {
            setSelectedAttributes(selectedAttributes.filter((item: any) => item !== e.target.value))
        } else {
            setSelectedAttributes([...selectedAttributes, e.target.value])
        }
    }

    return (
        <Layout>
            <Banner title="Assign Variant to Category" />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <FormGroup row style={{ marginBottom: "20px" }}>
                            {attributes && attributes?.map((attribute: any) => (
                                <FormControlLabel
                                    key={attribute._id}
                                    control={<Checkbox
                                        defaultChecked={category?.attributes.includes(attribute._id)}
                                    />}
                                    label={attribute.name}
                                    value={attribute._id}
                                    onClick={handleClick}
                                />
                            ))}
                        </FormGroup>
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default CategoryVariantAssign