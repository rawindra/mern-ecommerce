import { httpClient } from "../../utils/axios";

export const getAttributesOptionQueryFns = async () =>
    await httpClient.get("/attribute-options").then((res) => res.data.attributeOptions);

export const getAttributeOptionByIdQueryFns = async (id: any) =>
    await httpClient.get(`/attribute-options/${id}`).then((res) => res.data.attributeOption);
