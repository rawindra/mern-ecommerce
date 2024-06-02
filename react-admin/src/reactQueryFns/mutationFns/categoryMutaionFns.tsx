import { httpClient } from "../../utils/axios";

interface CategoryMutationFnsProps {
  formData: { name: string };
  id?: string;
}

export const createCategoryMutationFns = async (
  category: CategoryMutationFnsProps
) =>
  await httpClient.post("/categories/create", category.formData).then((res) => res.data);

export const updateCategoryMutationFns = async (
  category: CategoryMutationFnsProps
) =>
  await httpClient
    .put(`/categories/update/${category.id}`, category.formData)
    .then((res) => res.data);

export const deleteCategoryMutationFns = async (id: string) =>
  await httpClient.delete(`/categories/delete/${id}`).then((res) => res.data);
