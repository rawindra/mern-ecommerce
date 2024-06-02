import { MenuItem, Stack, TextField } from "@mui/material";
import { FC } from "react";
import { FieldErrors } from "react-hook-form";

type FormData = {
    attributes: string | undefined;
    minPrice: string | undefined;
    maxPrice: string | undefined;
};

const SelectedProductTypeField: FC<{ attributes: any; register: any; errors: FieldErrors<FormData>; selectedProductType: string }> = ({
    attributes,
    register,
    errors,
    selectedProductType,
}) => {
    if (selectedProductType === "single" || selectedProductType === "variable" || selectedProductType === "bundle") {
        return (
            <>
                {selectedProductType === "single" && (
                    <TextField
                        error={errors.price && true}
                        type="number"
                        label="Price"
                        variant="outlined"
                        size="small"
                        helperText={errors.price?.message}
                        {...register("price")}
                    />
                )}

                {selectedProductType === "variable" && (
                    <Stack spacing={1} direction={"row"}>
                        <TextField
                            error={errors.attribute && true}
                            select
                            fullWidth
                            size="small"
                            label="Select Attributes"
                            defaultValue=""
                            helperText={errors.attribute?.message}
                            {...register("attribute")}
                        >
                            {attributes.map((attribute: any) => (
                                <MenuItem key={attribute._id} value={attribute._id}>
                                    {attribute.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            error={errors.attributeOption && true}
                            select
                            fullWidth
                            size="small"
                            label="Select Attributes Option"
                            defaultValue=""
                            helperText={errors.attributeOption?.message}
                            {...register("attributeOption")}
                        >
                            {attributeOptions.map((option: any) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            error={errors.price && true}
                            type="number"
                            label="Price"
                            variant="outlined"
                            size="small"
                            fullWidth
                            helperText={errors.price?.message}
                            {...register("price")}
                        />
                    </Stack>
                )}

                {selectedProductType === "bundle" && (
                    <Stack spacing={1} direction={"row"}>
                        <TextField
                            error={errors.attribute && true}
                            select
                            fullWidth
                            size="small"
                            label="Select Attributes"
                            defaultValue=""
                            helperText={errors.attribute?.message}
                            {...register("attribute")}
                        >
                            {attributes.map((attribute: any) => (
                                <MenuItem key={attribute._id} value={attribute._id}>
                                    {attribute.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            error={errors.attributeOption && true}
                            select
                            fullWidth
                            size="small"
                            label="Select Attributes Option"
                            defaultValue=""
                            helperText={errors.attributeOption?.message}
                            {...register("attributeOption")}
                        >
                            {attributeOptions.map((option: any) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            error={errors.minPrice && true}
                            type="number"
                            label="Min Price"
                            variant="outlined"
                            size="small"
                            fullWidth
                            helperText={errors.minPrice?.message}
                            {...register("minPrice")}
                        />
                        <TextField
                            error={errors.maxPrice && true}
                            type="number"
                            label="Max Price"
                            variant="outlined"
                            size="small"
                            fullWidth
                            helperText={errors.maxPrice?.message}
                            {...register("maxPrice")}
                        />
                    </Stack>
                )}
            </>
        );
    }
    return null;
};

export default SelectedProductTypeField