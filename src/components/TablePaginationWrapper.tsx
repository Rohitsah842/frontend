import React from 'react'
import { TableRow, TablePagination, TableFooter } from '@mui/material'

import TablePaginationActions from './TablePaginationActions'

interface TablePaginationPropsType {
    rowCount: number,
    rowsPerPage: number,
    page: number,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TablePaginationWrapper = (props: TablePaginationPropsType) => {
    return (
        <TableFooter>
            <TableRow sx={{ '&:last-child td': { border: 0 } }}>
                <TablePagination
                    align="right"
                    rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={props.rowCount}
                    rowsPerPage={props.rowsPerPage}
                    page={props.page}
                    slotProps={{
                        select: {
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        },
                    }}
                    onPageChange={props.handleChangePage}
                    onRowsPerPageChange={props.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    )
}

export default TablePaginationWrapper