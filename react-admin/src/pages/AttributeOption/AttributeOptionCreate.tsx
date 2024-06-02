import { FC } from "react";

import { Button, Grid, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import Layout from "../../components/shared/Layout";
import Banner from "../../components/shared/Banner/Banner";
import { useNavigate } from "react-router-dom";
import { createdToast, errorToast } from "../../utils/helper";
import { createAttributeOptionMutationFns } from "../../reactQueryFns/mutationFns/attributeOptionMutaionFns";

interface AttributeOptionCreateProps { }

type FormData = {
    name: string;
};

const AttributeOptionCreate: FC<AttributeOptionCreateProps> = () => {
    const navigate = useNavigate();
    const schema: ZodType<FormData> = z.object({
        name: z.string().min(1, "Name is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: createAttributeOptionMutationFns,
        onSuccess: () => {
            navigate("/admin/attribute-options");
            createdToast("Attribute Option");
        },
        onError: (error: any) => {
            errorToast(error.response.data.message);
        },
    });

    const onSubmit = async (formData: FormData) => {
        mutate({ formData });
    };

    return (
        <Layout>
            <Banner title="Create Attribute option" />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} direction="column">
                            <TextField
                                error={errors.name && true}
                                label="Name"
                                variant="outlined"
                                size="small"
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
        </Layout>
    );
};

export default AttributeOptionCreate;
