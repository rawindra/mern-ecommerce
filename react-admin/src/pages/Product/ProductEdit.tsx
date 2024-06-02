import { FC } from "react";

import {
  Grid,
} from "@mui/material";

import Layout from "../../components/shared/Layout";
import Banner from "../../components/shared/Banner/Banner";

import useConstructFormData from "../../utils/constructFormData";

import { getProductByIdQueryFns } from "../../reactQueryFns/queryFns/productQueryFns";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProductMutationFns } from "../../reactQueryFns/mutationFns/productMutationFns";
import { errorToast, updatedToast } from "../../utils/helper";
import EditProductForm from "../../components/product/EditProductForm";

interface ProductEditProps { }

type FormData = {
  name: string;
  description: string;
  image: FileList | undefined | null;
  price: number | undefined;
  category: string;
  productType: string;
};

const ProductEdit: FC<ProductEditProps> = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const queryClinet = useQueryClient();


  const { data: product, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByIdQueryFns(id),
  });

  if (isError) {
    errorToast("Cant fetch product");
  }

  const defaultValues: FormData = product;

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductMutationFns,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["product", id] });
      navigate("/admin/products");
      updatedToast("Product");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });
  const onSubmit = (data: FormData) => {

    let formData = useConstructFormData(data);

    mutate({ id, formData })
  };

  return (
    <Layout>
      <Banner title="Edit Product" />
      <Grid container>
        <Grid item xs={12} md={6}>
          {
            defaultValues &&
            <EditProductForm
              isPending={isPending}
              onSubmit={onSubmit}
              defaultValue={defaultValues}
            />
          }
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductEdit;
