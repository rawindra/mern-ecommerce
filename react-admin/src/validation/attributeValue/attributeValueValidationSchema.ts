import * as yup from "yup";

export const createAttributeValueValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  attribute: yup.string().required("Attribute is required"),
});

export const editAttributeValueValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  attribute: yup.string().required("Attribute is required"),
});
