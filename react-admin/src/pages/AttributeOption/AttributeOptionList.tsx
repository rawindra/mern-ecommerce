import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletedToast, errorToast } from "../../utils/helper";
import { Delete, Edit } from "@mui/icons-material";
import { getAttributesOptionQueryFns } from "../../reactQueryFns/queryFns/attributeOptionQueryFns";
import { deleteAttributeOptionMutationFns } from "../../reactQueryFns/mutationFns/attributeOptionMutaionFns";

interface AttributeOptionListProps { }

const AttributeOptionList: FC<AttributeOptionListProps> = () => {
    const navigate = useNavigate();
    const queryClinet = useQueryClient();

    const { data: attributeOptions, isLoading } = useQuery({
        queryKey: ["attributeOptions"],
        queryFn: getAttributesOptionQueryFns,
        onError: () => {
            errorToast("Cant fetch Attribute Options");
        },
    })

    const { mutate, isLoading: isDeleteLoading } = useMutation({
        mutationFn: deleteAttributeOptionMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries(["attributeOptions"]);
            deletedToast("Attribute Option");
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
                        onClick={() => navigate(`/admin/attribute-options/edit/${params.row._id}`)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        disabled={isDeleteLoading}
                        icon={<Delete />}
                        label="Delete"
                        onClick={() => mutate(params.row._id)}
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
                onClick={() => navigate("/admin/attribute-options/create")}
            >
                Create Attribute Option
            </Button>
            <Box sx={{ height: 650, width: "100%", mt: 2 }}>
                <Typography variant="h4" component="h4">
                    Manage Attribute options
                </Typography>
                <DataGrid
                    loading={isLoading}
                    rows={attributeOptions || []}
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

export default AttributeOptionList;
