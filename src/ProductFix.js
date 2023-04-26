import * as React from 'react';
import { useState } from 'react';
import {
    Box,
    Button,
    styled,
    Typography
  } from '@mui/material';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import CreateProduct from './CreateProduct'

const ArrowButton=styled(Button)({
    boxShadow: 'none',
    borderColor: "#888888",
    color:'#888888',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: '#888888',
    boxShadow: 'none',
    color: '#000',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    borderColor: '#888888',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});


function ProductFix(props){

    const handleButtonClick = (params) => {
        let getData={
            showTable:true,
            params:''
          }
        props.handleTableToggle(getData);
        // console.log('test');
    }
    return(
        <Box sx={{marginTop:6}}>
           <Box  sx={{ p: 1 }}>
                <div  style={{ display: 'flex', alignItems: 'center' }}>
                    <div onClick={handleButtonClick}>
                        <ArrowButton variant="outlined" size="large">
                            <ArrowBackIcon />
                        </ArrowButton>
                    </div>
                    <Typography align="left" variant="h5">&nbsp;&nbsp;Product Detail </Typography>
                </div>
            </Box>
            {/* {`${props.tableData.id}+${props.tableData.image}`} */}
            <CreateProduct setData={props.tableData}/>
        </Box>

    )
}

export default ProductFix