import { useMemo } from "react";
import MaterialReactTable from 'material-react-table';
import { PropTypes } from 'prop-types';
import '../utils/style/Table.css';

function Table(props) {
    const data = props.data;
    const columnsProps = props.columns;

    const columns = useMemo(
        () => columnsProps,
        [columnsProps],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
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
        />
    );
}

Table.propTypes = {
    data: PropTypes.array,
    columnsProps: PropTypes.array
};

export default Table;