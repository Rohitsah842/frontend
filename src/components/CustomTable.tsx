
import React, { useState } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material'
import TablePaginationWrapper from './TablePaginationWrapper';

export type ColumnDefinitionType<T extends Record<string, any>, K extends keyof T> = {
    key: K;
    header: string;
}

type TableProps<T extends Record<string, any>, K extends keyof T> = {
    data: T[];
    columns: Array<ColumnDefinitionType<T, K>>;
}



const CustomTable = <T extends Record<string, any>, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto', my: '20px' }}>

            <Table sx={{ minWidth: 650 }} aria-label="EMI table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, i) => {
                            return <TableCell key={`headCell-${i}`} align="center">{column.header}</TableCell>;
                        })}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data
                    ).map((row, index1) => {
                        return (
                            <TableRow key={`row-${index1}`}>
                                {columns.map((column, index2) => {
                                    return <TableCell key={`cell-${index2}`} align="center">{row[column.key]}</TableCell>

                                })}

                            </TableRow>
                        );
                    })}
                </TableBody>
                <TablePaginationWrapper
                    rowCount={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage} />

            </Table>
        </TableContainer>
    )
}

export default CustomTable;