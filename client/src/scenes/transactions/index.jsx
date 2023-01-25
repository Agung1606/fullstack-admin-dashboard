import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'state/api';
import Header from 'components/Header';
import { Box, useTheme } from '@mui/material';
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();

    // values to be send to the backend
    const [ page, setPage] = useState(0);
    const [ pageSize, setPageSize ] = useState(20);
    const [ sort, setSort ] = useState({});
    const [ search, setSearch ] = useState("");

    const [ searchInput, setSearchInput ] = useState("");
    const { data } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    });
    
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            // we just grabbing the number of products 
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ];
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
        <Box
            height="80vh" // 80% of your screens
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiDataGrid-text": {
                    color: `${theme.palette.secondary[200]} !important`
                },
            }}
        >
            <DataGrid 
                loading={ !data }
                getRowId={ (row) => row._id }
                rows={ (data && data.transactions) || [] }
                columns={ columns }
                // because we use server side for pagination we need this configuration
                rowsPerPageOptions={[ 20, 50, 100 ]}
                rowCount={ (data && data.total) || 0 }
                pagination
                page={ page }
                pageSize={ pageSize }
                paginationMode="server"
                sortingMode="server"
                onPageChange={ (newPage) => setPage(newPage) }
                onPageSizeChange={ (newPageSize) => setPageSize(newPageSize) }
                onSortModelChange={ (newSortModel) => setSort(...newSortModel) }
                // custom data grid toolbar
                components={{ Toolbar: DataGridCustomToolbar }}
                componentsProps={{
                    toolbar: { searchInput, setSearchInput, setSearch }
                }}
            />
        </Box>
    </Box>
  )
}

export default Transactions;