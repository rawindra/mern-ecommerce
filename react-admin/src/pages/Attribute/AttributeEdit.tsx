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
import { getAttributeByIdQueryFns } from "../../reactQueryFns/queryFns/attributesQueryFns";
import { updateAttributeMutationFns } from "../../reactQueryFns/mutationFns/attributeMutaionFns";

interface AttributeCreateProps { }

type FormData = {
    name: string;
};

const AttributeEdit: FC<AttributeCreateProps> = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const queryClinet = useQueryClient();

    const schema: ZodType<FormData> = z.object({
        name: z.string().min(1, "Name is required"),
    });

    const { data: attribute } = useQuery({
        queryKey: ["attribute", id],
        queryFn: () => getAttributeByIdQueryFns(id),
        onError: () => {
            errorToast("Cant fetch attribute");
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
        mutationFn: updateAttributeMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries(["attribute", id]);
            navigate("/admin/attributes");
            updatedToast("Attribute");
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
            {attribute && (
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2} direction="column">
                                <TextField
                                    error={errors.name && true}
                                    label="Name"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={attribute.name}
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

export default AttributeEdit;
