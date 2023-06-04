import React, {useMemo, useEffect} from 'react';

import {useTable, useFilters, useGlobalFilter, useAsyncDebounce, useRowSelect} from 'react-table'
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
import {createTheme} from "@mui/material/styles";

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


const ReactTable = ({columns, data, onAdd, onRowSelect, selectedItem}) => {

    // const stateReducer = (newState, action) => {
    //     if (action.type === 'deselectAllRows') {
    //         return {...newState, selectedRowIds: {}};
    //     }
    //
    //     return newState;
    // }
    const selectableRows = onRowSelect && typeof onRowSelect === 'function'

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        toggleAllRowsSelected,
    } = useTable({
            columns,
            data,
            // stateReducer
        },
        useGlobalFilter,
        useRowSelect
    );

    // useEffect(() => {
    //     if (!selectedItem) {
    //         toggleAllRowsSelected(false);
    //     }
    // }, [selectedItem, toggleAllRowsSelected])

    const toggleRow = (selectedRow) => {
        if (!Object.keys(state.selectedRowIds).includes(selectedRow.id)) {
            // First unselect all rows when clicking another row
            toggleAllRowsSelected(false);
        }
        selectedRow.toggleRowSelected();
        if (selectableRows) {
            onRowSelect(selectedRow.original);
        }
    }

    return (
        <Box sx={{display: 'flex', width: '100%', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'end', alignContent: 'center', alignItems: 'center'}}>
                <Box>
                    <GlobalTableFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    {onAdd && typeof onAdd === 'function' &&
                        <IconButton
                            size='large'
                            onClick={() => onAdd()}
                        >
                            <AddBoxIcon fontSize='inherit'/>
                        </IconButton>
                    }
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
                        const selectableAttributes = {
                            onClick: () => toggleRow(row),
                            sx: {
                                '&:hover': {cursor: 'pointer'},
                                backgroundColor: (theme) =>
                                    row.isSelected
                                        ? theme.palette.secondary.light
                                        : '',
                                '> td': {
                                    color: (theme) =>
                                        row.isSelected
                                            ? theme.palette.primary.contrastText
                                            : '',
                                }
                            }
                        }
                        return (
                            <TableRow
                                {...row.getRowProps()}
                                {...(selectableRows ? {...selectableAttributes} : {})}
                            >
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
        </Box>
    );
};

export default ReactTable;