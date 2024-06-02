import { httpClient } from "../../utils/axios";

interface ProductMutationFnsProps {
    formData: FormData;
    id?: string;
}

interface ProductAttributeMutationFnsProps {
    formData: {
        variants: {
            attribute: { [key: string]: string },
            stock: number,
            price: number,
        }
    };
    id?: string;
}

export const createProductMutationFns = async (
    product: ProductMutationFnsProps
) =>
    await httpClient.post("/products/create", product.formData).then((res) => res.data);

export const updateProductMutationFns = async (
    product: ProductMutationFnsProps
) =>
    await httpClient
        .put(`/products/update/${product.id}`, product.formData)
        .then((res) => res.data);

export const deleteProductMutationFns = async (id: string) =>
    await httpClient.delete(`/products/delete/${id}`).then((res) => res.data);

export const assignProductAttributeMutationFns = async (
    product: ProductAttributeMutationFnsProps
) =>
    await httpClient
        .post(`/products/${product.id}/variants/assign`, product.formData)
        .then((res) => res.data);

export const deleteProductVariantMutationFns = async (product: { id: string | undefined, variantSku: string }) =>
    await httpClient
        .delete(`/products/${product.id}/variants/assign/${product.variantSku}/delete`)
        .then((res) => res.data)