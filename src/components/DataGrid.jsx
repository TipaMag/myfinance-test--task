import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from "@mui/x-data-grid";

import {useDispatch, useSelector} from "react-redux";
import {deleteOne, updateOne} from "../store/data-reducer";


export default function FullFeaturedCrudGrid() {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data.data)

    const [rows, setRows] = React.useState(data);
    const [rowModesModel, setRowModesModel] = React.useState(
        {},
    );

    React.useEffect(() => {
        setRows(data)
    }, [data])

    function EditToolbar() {
        // const {setRows, setRowModesModel} = props;

        const handleClick = () => {
            // const id = randomId();
            const id = 4
            setRows((oldRows) => [...oldRows, {id, name: "", age: ""}]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: {mode: 'edit', fieldToFocus: "name"},
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleRowEditStop = (
        params,
        event,
    ) => {
        if (params.reason === 'rowFocusOut') {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: 'edit'}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: 'view'}});
    };

    const handleDeleteClick = (id) => () => {
        // setRows(rows.filter((row) => row.id !== id));

        dispatch(deleteOne(id))
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: 'view', ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (!editedRow) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow};
        // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        dispatch(updateOne(newRow))
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {field: "id", headerName: "ID", width: 180},
        {
            field: "date",
            headerName: "Дата",
            type: "date",
            width: 180,
            editable: true,
            valueFormatter: (params) => {
                // Відображення дати у звичайному форматі
                const formattedDate = new Date(params.value).toLocaleDateString();
                return formattedDate;
            },
            valueParser: (value) => {
                // Зберігання дати в ISO форматі
                return new Date(value).toISOString();
            },
        },
        {
            field: "profit",
            headerName: "Прибуток",
            type: "number",
            width: 180,
            editable: true,
        },
        {
            field: "costs",
            headerName: "Витрати",
            type: "number",
            width: 180,
            editable: true,
        },
        {
            field: "accu_uah",
            headerName: "Накопичення в гривні",
            type: "number",
            width: 200,
            // editable: true,
        },
        {
            field: "accu_usd",
            headerName: "USD",
            type: "number",
            width: 200,
            // editable: true,
        },
        {
            field: "accu_eur",
            headerName: "EUR",
            type: "number",
            width: 200,
            // editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Дії",
            width: 100,
            cellClassName: "actions",
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === 'edit'

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={1}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={2}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={3}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={4}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                "& .actions": {
                    color: "text.secondary",
                },
                "& .textPrimary": {
                    color: "text.primary",
                },
            }}
        >
            <DataGrid
                // autoPageSize
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                // hideFooterPagination
                // slots={{
                //     toolbar: EditToolbar,
                // }}
                // slotProps={{
                //     toolbar: {setRows, setRowModesModel},
                // }}
            />
        </Box>
    );
}
