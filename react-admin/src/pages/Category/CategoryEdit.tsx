import { FC } from "react";

import { Button, Grid, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Layout from "../../components/shared/Layout";
import Banner from "../../components/shared/Banner/Banner";
import { updateCategoryMutationFns } from "../../reactQueryFns/mutationFns/categoryMutaionFns";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast, updatedToast } from "../../utils/helper";
import { getCategoryByIdQueryFns } from "../../reactQueryFns/queryFns/categoriesQueryFns";

interface CategoryCreateProps { }

type FormData = {
  name: string;
};

const CategoryEdit: FC<CategoryCreateProps> = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const queryClinet = useQueryClient();

  const schema: ZodType<FormData> = z.object({
    name: z.string().min(1, "Name is required"),
  });

  const { data: category, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryByIdQueryFns(id),
  });

  if (isError) {
    errorToast("Cant fetch Category");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCategoryMutationFns,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["category", id] });
      navigate("/admin/categories");
      updatedToast("Category");
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
      {category && (
        <Grid container>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} direction="column">
                <TextField
                  error={errors.name && true}
                  label="Name"
                  variant="outlined"
                  size="small"
                  defaultValue={category.name}
                  helperText={errors.name && errors.name.message}
                  {...register("name")}
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
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default CategoryEdit;
