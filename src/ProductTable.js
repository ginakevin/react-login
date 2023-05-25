import * as React from 'react';
import { useState,useEffect,Component,useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
    Box,
    styled,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Alert,
    Grid
  } from '@mui/material';
  import { useTheme } from "@mui/material/styles";
  import  rows from './StorageForTempt';
  import DeleteIcon from '@mui/icons-material/Delete';
  import ModeEditIcon from '@mui/icons-material/ModeEdit';


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
    field: 'Update',
    headerName: 'Update',
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <button onClick={() => console.log(`Button clicked for row ${params.id}`)}>Click me</button>
      );
    },
  },
  {
    field: 'Delete',
    headerName: 'Delete',
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

  // console.log("2");

  const [tableRow,setTableRow]=useState([]);
  const getSessionObj = sessionStorage.getItem("sessionAut");
  const auth = JSON.parse(getSessionObj);
  const [open, setOpen] = useState(false);
  const [deleteItemData,setDeleteItemData]=useState({});
  const [alertStates,setAlertStates]=useState({display:'none'});
  const timerRef = useRef(null);
  const [alertSeverity,setAlertSeverity]=useState("success");
  const [alertText,setAlertText]=useState("This is a success alert — Delete success");

  const handleOpen = (params) => {
    setDeleteItemData(params);
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // Perform delete action here
    handleClickToDelete();
    setOpen(false);
  };

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

  useEffect(() => {
    const callTableData = async () => {
      
      try {
        const payload = {
          "token": auth.token,
          "name": auth.username
        };
  
        const response = await fetch('http://demo1.tsmc-ai.com:3009/products/total/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        const jsonData = await response.json();
        const updatedData = jsonData.map((obj, index) => ({ ...obj, id: index + 1 }));
        setTableRow(updatedData);
        // console.log(updatedData);
      } catch (error) {
        // console.error('获取数据时出错：', error);
      }
    }
    callTableData();
  }, []);


 
  const handleButtonClick = (params) => {
    let getData={
      showTable:false,
      params:params.row
    }
    props.handleTableToggle(getData);
    // console.log(`Button clicked for row with ID ${params.row.id}`);
  }

  const handleClickToDelete=async()=>{
    let params={...deleteItemData};
    //做一個2次確認刪除ui
    let payload={
      "id": params.row._id,
      "token": auth.token
    }
    // console.log(params);
    try{
      const response = await fetch('http://demo1.tsmc-ai.com:3009/products/delete/id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload) // 根据需要设置请求体
      });
            
        const jsonData = await response.json();
        if(jsonData.status==='success'){
          const updatedData = tableRow.filter((item) => item._id !== params.row._id);
          setTableRow(updatedData);
          //alert說明成功
          setAlertSeverity('success');
          setAlertText("This is a success alert — Delete success");
          
        }
        else{
          //當無法刪除時alert 說明
          setAlertSeverity('error');
          setAlertText("This is a error alert — Please contact the administrator regarding permission issues.");
        }
        setAlertStates({display:'block'});
        timerRef.current = setTimeout(clearAlert, 2000);

        // console.log(jsonData);
    }catch(error){

    }
  }
  const clearAlert=()=>{
    setAlertStates({display:'none'});
    clearTimeout(timerRef.current);
    timerRef.current = null;
    // console.log(timerRef.current);
  }
  return (  
    <>
    <Box sx={{marginTop:4}}>
      <Typography align="left" variant="h4">All Products</Typography>
      <div style={alertStates}>
        <Alert variant="filled" severity={alertSeverity} sx={{ mt: 1 }}>
            {alertText}
        </Alert>
      </div>
      {/* <Typography align="left" variant="h4">All Products<br/></Typography> */}
      <BoxWrapper id="my-element" >
          <StyledDataGrid
          columns={cols.map((col) => {
            if (col.field === "Update") {
              return {
                ...col,
                renderCell: (params) => (
                  // <button onClick={() => handleButtonClick(params)}>Click me</button>
                      <IconButton
                        onClick={() => handleButtonClick(params)}
                        aria-label="edit"
                        size="small"
                      >
                        <ModeEditIcon fontSize="inherit" color='info' />
                      </IconButton>
                )
              };
            }
            if (col.field === "Delete") {
              return {
                ...col,
                renderCell: (params) => (
                      <IconButton
                        onClick={() => handleOpen(params)}
                        aria-label="edit"
                        size="small"
                      >
                        <DeleteIcon fontSize="inherit" color='info' />
                      </IconButton>
                )
              };
            }
            return col;
          })}
            // columns={cols}
            rows={tableRow}//{rows}
            slots={{
              toolbar: GridToolbar,
            }} 
            style={{ width,height,minWidth: '200px' }}
            // onCellClick={handleButtonClick}
          />
    </BoxWrapper>
  </Box>
  <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
  </Dialog>
  </>
  );
}