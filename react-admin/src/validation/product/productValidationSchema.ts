import * as yup from "yup";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../utils/constants";

export const createProductValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  productType: yup.string().required("Product type is required"),
  image: yup
    .mixed<FileList>()
    .test(
      "required",
      "File is required",
      (files) => files && files?.length !== 0
    )
    .test(
      "fileSize",
      "Only documents up to 5MB are permitted.",
      (files) =>
        !files || // Check if `files` is defined
        files.length === 0 || // Check if `files` is not an empty list
        Array.from(files).every((file) => file.size <= MAX_FILE_SIZE)
    )
    .test(
      "mimeType",
      "Only jpeg,jpg,png file is supported.",
      (files) =>
        !files ||
        files.length === 0 ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        )
    ),
  price: yup
    .number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .positive()
    .when("productType", {
      is: (productType: string) => ["single"].includes(productType),
      then: (price) => price.required("Price is required"),
    }),
  stock: yup
    .number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .positive()
    .when("productType", {
      is: (productType: string) => ["single"].includes(productType),
      then: (stock) => stock.required("Stock is required"),
    }),
});

export const editProductValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  productType: yup.string().required("Product type is required"),
  image: yup
    .mixed<FileList>()
    .nullable()
    .test(
      "fileSize",
      "Only documents up to 5MB are permitted.",
      (files) =>
        !files || // Check if `files` is defined
        files.length === 0 || // Check if `files` is not an empty list
        Array.from(files).every((file) => file.size <= MAX_FILE_SIZE)
    )
    .test(
      "mimeType",
      "Only jpeg,jpg,png file is supported.",
      (files) =>
        !files ||
        files.length === 0 ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        )
    ),
  price: yup
    .number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .positive()
    .when("productType", {
      is: (productType: string) => ["single"].includes(productType),
      then: (price) => price.required("Price is required"),
    }),
  stock: yup
    .number()
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .positive()
    .when("productType", {
      is: (productType: string) => ["single"].includes(productType),
      then: (stock) => stock.required("Stock is required"),
    }),
});
