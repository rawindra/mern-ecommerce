import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletedToast, errorToast } from "../../utils/helper";
import { deleteCategoryMutationFns } from "../../reactQueryFns/mutationFns/categoryMutaionFns";
import { ColorLens, Delete, Edit } from "@mui/icons-material";
import { getCategoriesQueryFns } from "../../reactQueryFns/queryFns/categoriesQueryFns";

interface CategoryListProps { }

const CategoryList: FC<CategoryListProps> = () => {
  const navigate = useNavigate();
  const queryClinet = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesQueryFns,
  })

  const { mutate, isPending: isDeleteLoading } = useMutation({
    mutationFn: deleteCategoryMutationFns,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["categories"] });
      deletedToast("Category");
    },
    onError: (error: any) => {
      errorToast(error.response.data.message);
    },
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
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
            onClick={() => navigate(`/admin/categories/edit/${params.row._id}`)}
            color="inherit"
          />,
          <GridActionsCellItem
            disabled={isDeleteLoading}
            icon={<Delete />}
            label="Delete"
            onClick={() => mutate(params.row._id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ColorLens />}
            label="Assign Option"
            className="textPrimary"
            onClick={() => navigate(`/admin/category/variant/assign/${params.row._id}`)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Layout>
      <Button
        variant="contained"
        onClick={() => navigate("/admin/categories/create")}
      >
        Create Category
      </Button>
      <Box sx={{ height: 650, width: "100%", mt: 2 }}>
        <Typography variant="h4" component="h4">
          Manage Categories
        </Typography>
        <DataGrid
          loading={isLoading}
          rows={categories || []}
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

export default CategoryList;
