import { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from 'material-react-table';
import { PropTypes } from 'prop-types';
import '../utils/style/Table.css';
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { deleteEmployee, updateEmployee } from "../services/APIService";
import { useSelector } from "react-redux";
import { departments, states } from "../data";
import { regexText, regexStreet, regexCity, regexZip } from "../utils/global/globalRegex";

function Table(props) {
    const data = props.data;
    const [tableData, setTableData] = useState(() => data);
    const [validationErrors, setValidationErrors] = useState({});
    const selectorToken = useSelector((state) => state.user.token);

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === "firstname" || cell.column.id === "lastname"
                            ? event.target.value.match(regexText)
                            : cell.column.id === "street"
                                ? event.target.value.match(regexStreet)
                                : cell.column.id === "city"
                                    ? event.target.value.match(regexCity)
                                    : cell.column.id === "zipCode"
                                        ? event.target.value.match(regexZip)
                                        : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `Valid ${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'firstname',
                header: 'First Name',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'lastname',
                header: 'Last Name',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'dateOfBirth',
                header: 'Date Of Birth',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'date',
                }),
            },
            {
                accessorKey: 'startDate',
                header: 'Start Date',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'date',
                }),
            },
            {
                accessorKey: 'street',
                header: 'Street',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'city',
                header: 'City',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'state',
                header: 'State',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: states.map((state) => (
                        <MenuItem key={state.name} value={state.abbreviation}>
                            {state.name}
                        </MenuItem>
                    )),
                },
            },
            {
                accessorKey: 'zipCode',
                header: 'Zip Code',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'department',
                header: 'Department',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: departments.map((department) => (
                        <MenuItem key={department.name} value={department.name}>
                            {department.name}
                        </MenuItem>
                    )),
                },
            },
        ],
        [getCommonEditTextFieldProps],
    );

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            await updateEmployee(tableData[row.index], selectorToken);
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = async (row) => {
        if (
            !alert(`Are you sure you want to delete ${row.getValue('firstname')}`)
        ) {
            await deleteEmployee(tableData[row.index], selectorToken);
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
            return;
        }
    };

    return (
        <MaterialReactTable
            displayColumnDefOptions={{
                'mrt-row-actions': {
                    muiTableHeadCellProps: {
                        align: 'center',
                    },
                    size: 120,
                },
            }}
            columns={columns}
            data={tableData}
            className="employee-table"
            muiTablePaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '0',
                    border: '1px solid rgb(147, 173, 24)',
                },
            }}
            muiTableBodyProps={{
                sx: (theme) => ({
                    '& tr:nth-of-type(odd)': {
                        backgroundColor: 'rgba(147, 173, 24, .2)',
                    },
                }),
            }}
            muiTableProps={{
                sx: {
                    tableLayout: 'fixed',
                },
            }}
            editingMode="modal"
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            enableRowActions
            renderRowActions={({ row, table }) => (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => table.setEditingRow(row)}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        />
    );
}

const validateRequired = (value) => !!value.length;

Table.propTypes = {
    data: PropTypes.array,
    columnsProps: PropTypes.array
};

export default Table;