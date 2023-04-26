import * as React from 'react';
import { useState,useEffect,Component } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
    Box,
    styled,
    Typography
  } from '@mui/material';
  import { useTheme } from "@mui/material/styles";
  import  rows from './StorageForTempt'

const cols=[
  { field: 'productName',headerName: 'Product Name', hideable: false,},
  { field: 'category',headerName: 'Category', },
  { field: 'description',headerName: 'Description',  width: 150,},
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="avatar"
        style={{ width: '50%', height: '100%' }}
      />
    ),
  },
  { field: 'price',headerName: 'Price', },
  { field: 'amount',headerName: 'Amount', },
  { field: 'width',headerName: 'Width', },
  { field: 'height',headerName: 'Height',},
  {
    field: 'action',
    headerName: '',
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <button onClick={() => console.log(`Button clicked for row ${params.id}`)}>Click me</button>
      );
    },
  },
]

const localeText = {
   
  };
  
const StyledDataGrid = styled(DataGrid)({
  border: '2px solid #9D9D9D',
  borderRadius: '8px',
  background: '#f9f9f9',
  '& .MuiDataGrid-cell': {
  },
});
const BoxWrapper = styled(Box)({
  marginTop: 6,
  height: '100%',
  width: '100%',
  // border: '1px solid red',
  overflow: 'auto',
});
export default function ProductTable(props) {
  /**每次resize 時重新計算DataGrid的寬高
   */
  const [width, setWidth] = useState(window.innerWidth-100);
  const [height, setHeight] = useState((window.innerHeight*2)/3);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth-100);
      setHeight((window.innerHeight*2)/3);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  /** end */

  const handleButtonClick = (params) => {
    let getData={
      showTable:false,
      params:params.row
    }
    props.handleTableToggle(getData);
    // console.log(`Button clicked for row with ID ${params.row.id}`);
  }


  return (  
    <>
    <Box sx={{marginTop:4}}>
      <Typography align="left" variant="h4">All Products<br/>
      {/* The width of this element is: {height}px */}
      </Typography>
      <BoxWrapper id="my-element" >
          <StyledDataGrid
          columns={cols.map((col) => {
            if (col.field === "action") {
              return {
                ...col,
                renderCell: (params) => (
                  <button onClick={() => handleButtonClick(params)}>Click me</button>
                ),
              };
            }
            return col;
          })}
            // columns={cols}
            rows={rows}
            slots={{
              toolbar: GridToolbar,
            }} 
            style={{ width,height,minWidth: '200px' }}
            // onCellClick={handleButtonClick}
          />
    </BoxWrapper>
  </Box>
  </>
  );
}