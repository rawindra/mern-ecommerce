import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletedToast, errorToast } from "../../utils/helper";
import { Delete, Edit, } from "@mui/icons-material";
import { getAttributesQueryFns } from "../../reactQueryFns/queryFns/attributesQueryFns";
import { deleteAttributeMutationFns } from "../../reactQueryFns/mutationFns/attributeMutaionFns";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { getAttributesOptionQueryFns } from "../../reactQueryFns/queryFns/attributeOptionQueryFns";


interface AttributeListProps { }

const AttributeList: FC<AttributeListProps> = () => {
    const navigate = useNavigate();
    const queryClinet = useQueryClient();

    const { data: attributeOpions } = useQuery({
        queryKey: ["attribute-options"],
        queryFn: getAttributesOptionQueryFns,
    })

    const { data: attributes, isLoading, isError } = useQuery({
        queryKey: ["attributes"],
        queryFn: getAttributesQueryFns,
    })

    if (isError) {
        errorToast("Cant fetch attributes");
    }

    const { mutate, isPending } = useMutation({
        mutationFn: deleteAttributeMutationFns,
        onSuccess: () => {
            queryClinet.invalidateQueries({ queryKey: ["attributes"] });
            deletedToast("Attribute");
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
                        onClick={() => navigate(`/admin/attributes/edit/${params.row._id}`)}
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
                        icon={<ColorLensIcon />}
                        label="Assign Option"
                        className="textPrimary"
                        onClick={() => navigate(`/admin/attribute/options/assign/${params.row._id}`)}
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
                onClick={() => navigate("/admin/attributes/create")}
            >
                Create Attribute
            </Button>
            <Box sx={{ height: 650, width: "100%", mt: 2 }}>
                <Typography variant="h4" component="h4">
                    Manage Attributes
                </Typography>
                <DataGrid
                    loading={isLoading}
                    rows={attributes || []}
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

export default AttributeList;
