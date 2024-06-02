import { FC } from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField, Button, MenuItem } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductValidationSchema } from "../../validation/product/productValidationSchema";
import { LoadingButton } from "@mui/lab";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryFns } from "../../reactQueryFns/queryFns/categoriesQueryFns";

interface CreateProductFormProps {
    onSubmit: (data: FormData) => void;
    isPending: boolean;
}

type FormData = {
    name: string;
    description: string;
    image: FileList | undefined;
    price: number | undefined;
    stock: number | undefined;
    category: string;
    productType: string;
};

const CreateProductForm: FC<CreateProductFormProps> = ({ onSubmit, isPending }) => {
    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getCategoriesQueryFns });
    const productTypes = ["single", "variant", "bundle"];

    const {
        register,
        watch,
        unregister,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(createProductValidationSchema),
    });

    const selectedProductType = watch("productType");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} direction="column">
                <TextField
                    error={errors.name && true}
                    label="Name"
                    variant="outlined"
                    size="small"
                    helperText={errors.name?.message}
                    {...register("name")}
                />

                <TextField
                    error={errors.description && true}
                    label="Description"
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
                        defaultValue=""
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
                    defaultValue=""
                    helperText={errors.productType?.message}
                    {...register("productType", {
                        onChange: () => {
                            unregister("price")
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
                            variant="outlined"
                            size="small"
                            type="number"
                            helperText={errors.price?.message}
                            {...register("price")}
                        />

                        <TextField
                            error={errors.stock && true}
                            label="Stock"
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

export default CreateProductForm;
