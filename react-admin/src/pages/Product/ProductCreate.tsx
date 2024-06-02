import { FC } from "react";

import { Grid } from "@mui/material";

import Layout from "../../components/shared/Layout";
import Banner from "../../components/shared/Banner/Banner";

import useConstructFormData from "../../utils/constructFormData";
import { useMutation } from "@tanstack/react-query";
import { createProductMutationFns } from "../../reactQueryFns/mutationFns/productMutationFns";
import { useNavigate } from "react-router-dom";
import { createdToast, errorToast } from "../../utils/helper";
import CreateProductForm from "../../components/product/CreateProductForm";

interface ProductCreateProps { }

type FormData = {
  name: string;
  description: string;
  image: FileList | undefined;
  price: number | undefined;
  category: string;
  productType: string;
};

const ProductCreate: FC<ProductCreateProps> = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createProductMutationFns,
    onSuccess: () => {
      navigate("/admin/products");
      createdToast("Product");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });
  const onSubmit = (data: FormData) => {

    let formData = useConstructFormData(data);

    mutate({ formData })
  };

  return (
    <Layout>
      <Banner title="Create Product" />
      <Grid container>
        <Grid item xs={12} md={6}>
          <CreateProductForm
            onSubmit={onSubmit}
            isPending={isPending}
          />
        </Grid>
      </Grid>
    </Layout >
  );
};

export default ProductCreate;
