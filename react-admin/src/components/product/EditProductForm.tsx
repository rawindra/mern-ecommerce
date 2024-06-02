import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, MenuItem, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { getCategoriesQueryFns } from "../../reactQueryFns/queryFns/categoriesQueryFns";
import { editProductValidationSchema } from "../../validation/product/productValidationSchema";

interface EditProductFormProps {
    isPending: boolean;
    onSubmit: (data: FormData) => void;
    defaultValue: FormData;
}

type FormData = {
    name: string;
    description: string;
    image: FileList | undefined | null;
    price: number | undefined;
    stock: number | undefined;
    category: string;
    productType: string;
};

const EditProductForm: FC<EditProductFormProps> = ({ onSubmit, isPending, defaultValue }) => {
    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategoriesQueryFns });
    const productTypes = ["single", "variant", "bundle"];
    const [selectedProductType, setSelectedproductType] = useState(defaultValue.productType);

    const {
        register,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(editProductValidationSchema),
    });

    // useEffect(() => {
    //     if (defaultValue.productType === "bundle") {
    //         selectedProductType = "bundle";
    //         unregister("productType");
    //     }
    // })


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} direction="column">
                <TextField
                    error={errors.name && true}
                    label="Name"
                    defaultValue={defaultValue.name}
                    variant="outlined"
                    size="small"
                    helperText={errors.name?.message}
                    {...register("name")}
                />

                <TextField
                    error={errors.description && true}
                    label="Description"
                    defaultValue={defaultValue.description}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={20}
                    helperText={errors.description?.message}
                    {...register("description")}
                />
                {categories &&
                    <TextField
                        error={errors.category && true}
                        select
                        fullWidth
                        label="Select Category"
                        defaultValue={defaultValue.category}
                        helperText={errors.category?.message}
                        {...register("category")}
                    >
                        {categories.map((category: any) =>
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        )}
                    </TextField>

                }

                <TextField
                    error={errors.productType && true}
                    select
                    fullWidth
                    label="Select Prodyct Type"
                    defaultValue={defaultValue.productType}
                    helperText={errors.productType?.message}
                    {...register("productType", {
                        onChange: (e) => {
                            setSelectedproductType(e.target.value);
                            unregister("price");
                            unregister("stock")
                        }
                    })}
                >
                    {productTypes && productTypes.map((type: any) =>
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    )}
                </TextField>

                {
                    selectedProductType !== "bundle" && selectedProductType !== "variant" &&
                    <>
                        <TextField
                            error={errors.price && true}
                            label="Price"
                            defaultValue={defaultValue.price}
                            variant="outlined"
                            size="small"
                            type="number"
                            helperText={errors.price?.message}
                            {...register("price")}
                        />

                        <TextField
                            error={errors.stock && true}
                            label="Stock"
                            defaultValue={defaultValue.stock}
                            variant="outlined"
                            size="small"
                            type="number"
                            helperText={errors.stock?.message}
                            {...register("stock")}
                        />
                    </>
                }

                <TextField
                    error={errors.image && true}
                    type="file"
                    helperText={errors.image?.message}
                    {...register("image")}
                />

                {isPending ? (
                    <LoadingButton loading variant="contained">
                        Submit
                    </LoadingButton>
                ) : (
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                )}
            </Stack>
        </form>
    );
};

export default EditProductForm;
