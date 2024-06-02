import { httpClient } from "../../utils/axios";

export const getProductQueryFns = async () =>
    await httpClient.get("/products").then((res) => res.data.products);

export const getProductByIdQueryFns = async (id: any) =>
    await httpClient.get(`/products/${id}`).then((res) => res.data.product);
