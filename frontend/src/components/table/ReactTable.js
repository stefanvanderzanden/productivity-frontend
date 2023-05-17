import React, {useMemo} from 'react';

import {useTable, useFilters, useGlobalFilter, useAsyncDebounce} from 'react-table'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

const GlobalTableFilter = ({preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
    return (
        <TextField
            id='input-with-icon-textfield'
            placeholder='Zoeken'
            value={value || ''}
            sx={{mt: 1}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
            variant='standard'
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
        />
    )
}


const ReactTable = ({columns, data, onAdd}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({
            columns,
            data,
        },
        useGlobalFilter
    );

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'end', alignContent: 'center', alignItems: 'center'}}>
                <Box>
                    <GlobalTableFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <IconButton
                        size='large'
                        onClick={() => onAdd()}
                    >
                        <AddBoxIcon fontSize='inherit'/>
                    </IconButton>
                </Box>
            </div>
            <MaUTable size='small' {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps([
                                    {
                                        style: {
                                            ...column.style,
                                            fontWeight: 'bold'
                                        },
                                    }
                                ])}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps([
                                                {
                                                    style: cell.column.style,
                                                }
                                            ]
                                        )}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
        </>
    );
};

export default ReactTable;