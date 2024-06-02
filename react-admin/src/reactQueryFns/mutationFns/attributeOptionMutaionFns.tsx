import { AttributeOptionFormData } from "../../types/AttributeOption";
import { httpClient } from "../../utils/axios";

interface AttributeOptionMutationFnsProps {
  formData: AttributeOptionFormData;
  id?: string;
}

export const createAttributeOptionMutationFns = async (
  attributeOption: AttributeOptionMutationFnsProps
) =>
  await httpClient
    .post("/attribute-options/create", attributeOption.formData)
    .then((res) => res.data);

export const updateAttributeOptionMutationFns = async (
  attributeOption: AttributeOptionMutationFnsProps
) =>
  await httpClient
    .put(`/attribute-options/update/${attributeOption.id}`, attributeOption.formData)
    .then((res) => res.data);

export const deleteAttributeOptionMutationFns = async (id: string) =>
  await httpClient.delete(`/attribute-options/delete/${id}`).then((res) => res.data);
