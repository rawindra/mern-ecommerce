import { FC } from "react";
import Layout from "../../components/shared/Layout";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductQueryFns } from "../../reactQueryFns/queryFns/productQueryFns";
import { deletedToast, errorToast } from "../../utils/helper";
import { deleteProductMutationFns } from "../../reactQueryFns/mutationFns/productMutationFns";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Delete, Edit, ColorLens } from "@mui/icons-material";

interface ProductListProps { }

const ProductList: FC<ProductListProps> = () => {
  const navigate = useNavigate();
  const queryClinet = useQueryClient();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProductQueryFns,
  })

  if (isError) {
    errorToast("Cant fetch products");
  }

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProductMutationFns,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["products"] });
      deletedToast("Product");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => <img src={`http://localhost:8000/${params.value}`} width={50} height={50} alt={params.value} />,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      valueGetter: (params) => {
        return params.row.category.name;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 200,
      cellClassName: "actions",
      getActions: (params: GridRowParams) => {
        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/admin/products/edit/${params.row._id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            disabled={isPending}
            icon={<Delete />}
            label="Delete"
            onClick={() => mutate(params.row._id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ColorLens />}
            label="Assign Option"
            className="textPrimary"
            onClick={() => navigate(`/admin/product/variant/assign/${params.row._id}`)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Layout>
      <Button variant="contained" onClick={() => navigate("/admin/products/create")}>
        Create Product
      </Button>
      <Box sx={{ height: 650, width: "100%", mt: 2 }}>
        <Typography variant="h4" component="h4">
          Manage Products
        </Typography>
        <DataGrid
          loading={isLoading}
          rows={products || []}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Layout>
  );
};

export default ProductList;
