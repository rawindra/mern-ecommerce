import { FC } from "react";

import { Button, Grid, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Layout from "../../components/shared/Layout";
import Banner from "../../components/shared/Banner/Banner";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast, updatedToast } from "../../utils/helper";
import { getAttributeOptionByIdQueryFns } from "../../reactQueryFns/queryFns/attributeOptionQueryFns";
import { updateAttributeOptionMutationFns } from "../../reactQueryFns/mutationFns/attributeOptionMutaionFns";

interface AttributeOptionCreateProps { }

type FormData = {
    name: string;
};

const AttributeOptionEdit: FC<AttributeOptionCreateProps> = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const queryClinet = useQueryClient();

    const schema: ZodType<FormData> = z.object({
        name: z.string().min(1, "Name is required"),
    });

    const { data: attributeOption } = useQuery({
        queryKey: ["attributeOption", id],
        queryFn: () => getAttributeOptionByIdQueryFns(id),
        onError: () => {
            errorToast("Cant fetch attribute option");
        },
    });


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: updateAttributeOptionMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries(["attributeOption", id]);
            navigate("/admin/attribute-options");
            updatedToast("Attribute Option");
        },
        onError: (error: any) => {
            errorToast(error.response.data.message);
        },
    });

    const onSubmit = async (formData: FormData) => {
        mutate({ id, formData });
    };

    return (
        <Layout>
            <Banner title="Edit Category" />
            {attributeOption && (
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2} direction="column">
                                <TextField
                                    error={errors.name && true}
                                    label="Name"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={attributeOption.name}
                                    helperText={errors.name && errors.name.message}
                                    {...register("name")}
                                />
                                {isLoading ? (
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
                    </Grid>
                </Grid>
            )}
        </Layout>
    );
};

export default AttributeOptionEdit;
