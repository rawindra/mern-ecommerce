import { httpClient } from "../../utils/axios";

export const getAttributesQueryFns = async () =>
  await httpClient.get("/attributes").then((res) => res.data.attributes);

export const getAttributeByIdQueryFns = async (id: any) =>
  await httpClient.get(`/attributes/${id}`).then((res) => res.data.attribute);
