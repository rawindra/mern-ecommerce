import { AssignAttributeOptionFormData, AttributeFormData } from "../../types/Attribute";
import { httpClient } from "../../utils/axios";

interface AttributeMutationFnsProps {
  formData: AttributeFormData;
  id?: string;
}

interface AssignAttributeOptionMutationFnsProps {
  formData: AssignAttributeOptionFormData;
  id?: string;
}

export const createAttributeMutationFns = async (
  attribute: AttributeMutationFnsProps
) =>
  await httpClient
    .post("/attributes/create", attribute.formData)
    .then((res) => res.data);

export const updateAttributeMutationFns = async (
  attribute: AttributeMutationFnsProps
) =>
  await httpClient
    .put(`/attributes/update/${attribute.id}`, attribute.formData)
    .then((res) => res.data);

export const deleteAttributeMutationFns = async (id: string) =>
  await httpClient.delete(`/attributes/delete/${id}`).then((res) => res.data);

export const assignAttributeOptionMutationFns = async (attribute: AssignAttributeOptionMutationFnsProps) =>
  await httpClient.post(`/attributes/${attribute.id}/attribute-options/assign/`, attribute.formData).then((res) => res.data);
