import { httpClient } from "../../utils/axios";

export const getCategoriesQueryFns = async () =>
  await httpClient.get("/categories").then((res) => res.data.categories);

export const getCategoryByIdQueryFns = async (id: any) =>
  await httpClient.get(`/categories/${id}`).then((res) => res.data.category);

export const getCategoryAttributesQueryFns = async (id: any) =>
  await httpClient.get(`/products/${id}/attributes`).then((res) => res.data.product.category.attributes);