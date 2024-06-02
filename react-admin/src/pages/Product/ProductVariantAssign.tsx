import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Banner from "../../components/shared/Banner/Banner";
import Layout from "../../components/shared/Layout";
import { assignProductAttributeMutationFns, deleteProductVariantMutationFns } from "../../reactQueryFns/mutationFns/productMutationFns";
import { getCategoryAttributesQueryFns } from "../../reactQueryFns/queryFns/categoriesQueryFns";
import { getProductByIdQueryFns } from "../../reactQueryFns/queryFns/productQueryFns";
import { deletedToast, errorToast, updatedToast } from "../../utils/helper";

interface FormData {
    variants: {
        attribute: { [key: string]: string },
        stock: number,
        price: number,
    }
}

const ProductVariantAssign = () => {
    const queryClinet = useQueryClient();
    const { id } = useParams();

    const { data: attributes } = useQuery({
        queryKey: ["attributes"],
        queryFn: () => getCategoryAttributesQueryFns(id)
    });

    const { data: product, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductByIdQueryFns(id)
    })

    if (isError) {
        errorToast("Cant fetch product");
    }

    const { mutate, isPending } = useMutation({
        mutationFn: assignProductAttributeMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ["product", id] });
            updatedToast("Variant");
        },
        onError: (error: any) => {
            errorToast(error.response.data.message);
        },
    })

    const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
        mutationFn: deleteProductVariantMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ["product", id] });
            deletedToast("Variant");
        },
        onError: (error: any) => {
            errorToast(error.response.data.message);
        },
    });

    const selectedProductType = product?.productType

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormData>();


    const onSubmit = (formData: FormData) => {
        mutate({ id, formData })
        reset()
    };

    const handleDelete = (variantSku: string) => {
        mutateDelete({ id, variantSku })
    }

    return (

        <Layout>
            <Banner title="Assign Variant to Product" />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {selectedProductType === "variant" && (
                            <div style={{ marginBottom: "10px", display: "flex", gap: "10px", flexDirection: "column" }}>
                                {attributes && attributes.map((attribute: any) =>
                                    attribute.attributeOptions.length > 0 &&
                                    (<Box key={attribute._id}>
                                        <TextField
                                            select
                                            fullWidth
                                            defaultValue=""
                                            label={attribute.name}
                                            {...register(`variants.attribute.${attribute.name}`)}
                                        >
                                            {attribute.attributeOptions.map((option: any) => {
                                                return <MenuItem key={option._id} value={option.name}>
                                                    {option.name}
                                                </MenuItem>
                                            })}
                                        </TextField>
                                    </Box>)
                                )

                                }
                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    {...register("variants.price")}
                                />
                                <TextField
                                    label="Stock"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    {...register("variants.stock")}
                                />
                            </div>
                        )}
                        <Button variant="contained" disabled={isPending} style={{ marginTop: "10px" }} type="submit">Submit</Button>
                    </form>
                </Grid>
            </Grid>
            <h1>Assigned Variants</h1>
            <Grid container>
                <Grid item>
                    {product?.variants && product.variants.map((variant: any) =>
                        <div key={variant._id} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                            {Object.keys(variant.attribute).map((key) => (
                                <span key={key} >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {variant.attribute[key]}
                                </span>
                            ))}
                            <span>price: {variant.price}</span>
                            <span>stock: {variant.stock}</span>
                            <span>sku: {variant.sku}</span>
                            <Button variant="contained" disabled={isPendingDelete} color="error" size="small" onClick={() => handleDelete(variant.sku)}>Delete</Button>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Layout >
    );
}

export default ProductVariantAssign