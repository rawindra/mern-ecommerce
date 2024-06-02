import { FC } from "react";

import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Layout from "../../components/shared/Layout";
import Banner from "../../components/shared/Banner/Banner";
import { useNavigate, useParams } from "react-router-dom";
import { createdToast, errorToast } from "../../utils/helper";
import { assignAttributeOptionMutationFns, } from "../../reactQueryFns/mutationFns/attributeMutaionFns";
import { getAttributesOptionQueryFns } from "../../reactQueryFns/queryFns/attributeOptionQueryFns";
import { getAttributeByIdQueryFns } from "../../reactQueryFns/queryFns/attributesQueryFns";

interface AttributeOptionAssignProps { }

type FormData = {
    optionIds: [];
};

const AttributeOptionAssign: FC<AttributeOptionAssignProps> = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClinet = useQueryClient();
    const { data: attributeOptions } = useQuery({
        queryKey: ["attribute-options"],
        queryFn: getAttributesOptionQueryFns
    })
    const { data: attribute } = useQuery({
        queryKey: ["attribute", id],
        queryFn: () => getAttributeByIdQueryFns(id)
    })

    const {
        register,
        handleSubmit,
    } = useForm<FormData>();

    const { mutate, isPending } = useMutation({
        mutationFn: assignAttributeOptionMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ["attribute", id] });
            navigate("/admin/attributes");
            createdToast("Attribute Option Assign Successfully");
        },
        onError: (error: any) => {
            errorToast(error.response.data.message);
        },
    });

    const onSubmit = async (formData: FormData) => {
        console.log("🚀 ~ onSubmit ~ formData:", formData)
        mutate({ id, formData });
    };

    return (
        <Layout>
            <Banner title="Assign Attribute Options" />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2} direction="row" mb={2}>
                            {
                                attributeOptions?.map((attributeOption: any) => (
                                    <div key={attributeOption._id}>
                                        <span className="label-text">{attributeOption.name}</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            value={attributeOption._id}
                                            defaultChecked={attribute?.attributeOptions?.some((option: any) => option._id === attributeOption._id)}
                                            {...register("optionIds")}

                                        />
                                    </div>
                                ))
                            }
                        </Stack>
                        {isPending ? (
                            <LoadingButton loading variant="contained">
                                Submit
                            </LoadingButton>
                        ) : (
                            <Button type="submit" variant="contained">
                                Submit
                            </Button>
                        )}
                    </form>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default AttributeOptionAssign;
