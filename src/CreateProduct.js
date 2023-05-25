import React, { useState,useRef } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Divider,
  Grid,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert
} from '@mui/material';
import CreateImgFile from './CreateImgFile'
import { styled } from '@mui/system';



const StyledBox = styled(Box)({
    border: '1px solid #BEBEBE',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    padding: 12,
});


const CreateProduct = (props) => {
  const [name, setName] = useState((props.setData===undefined)?'':props.setData.productName);
  const [description, setDescription] = useState((props.setData===undefined)?'':props.setData.description);
  const [Image,setImage] = useState((props.setData===undefined)?'':props.setData.image);
  const [price, setPrice] = useState((props.setData===undefined)?'':props.setData.price);
  const [amount, setAmount] = useState((props.setData===undefined)?'':props.setData.amount);
  const [width, setWidth] = useState((props.setData===undefined)?'':props.setData.width);
  const [height, setHeight] = useState((props.setData===undefined)?'':props.setData.height);
  const [selectedOption, setSelectedOption] = useState((props.setData===undefined)?'':props.setData.category);
  const [dialogOpen , setDialogOpen]= useState(false);
  const [formData,setFormData]=useState([]);

  const [editDialog,setEditDialog]=useState(false);

  const [alertStates,setAlertStates]=useState({display:'none'});
  const timerRef = useRef(null);
  const [alertSeverity,setAlertSeverity]=useState("success");
  const [alertText,setAlertText]=useState("This is a success alert — create product detail success");


  const getSessionObj = sessionStorage.getItem("sessionAut");
  const auth = JSON.parse(getSessionObj);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const entries = data.entries();
    let getData={}
    for (const [name, value] of entries) {
      getData[name]=value;
      // console.log(name+" === "+ value);
    }
    getData["image"]=Image;
    getData["selectedOption"]=selectedOption;
    if(!getData["image"].trim()){
      return;
    }
    setFormData(Object.entries(getData));
    // console.log(formData)
    
    // console.log(selectedOption);
    setDialogOpen(true);
    // Handle form submission here
  };
  const getImgFile=(imgData)=>{
    // console.log(imgData);
    setImage(imgData);
  }
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    // console.log(event.target.value);
  };
  const handleDialogConfirm=()=>{
    if(auth.isEdit){
      fetchDataToServer();
      console.log('可以編輯並送出資料');
    }else{
      setEditDialog(true);
      console.log('不可以編輯並顯示原因');
    }
    setDialogOpen(false);
  } 
  const handleEditDialogClose=()=>{
    setEditDialog(false);
  }

  const fetchDataToServer= async()=>{
    let fetchLink=(!!props.setData)?'http://demo1.tsmc-ai.com:3009/products/update/id':'http://demo1.tsmc-ai.com:3009/products/create';
    let createPData={
      "productName": name,
      "category": selectedOption,
      "description": description,
      "image": Image,
      "price": price,
      "amount": amount,
      "width": width,
      "height": height,
      "username": auth.username,
      "token": auth.token
    };
    let getSentData=(!!props.setData)?{
      ...createPData,
      'id':props.setData._id
    }:createPData;
    // console.log(!!props.setData);
    // console.log(props.setData);
    // console.log(getSentData);
    try{
      const response = await fetch(fetchLink, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(getSentData) // 根据需要设置请求体
      });
            
        const jsonData = await response.json();
        if(jsonData.status==='success'){
          setAlertSeverity('success');
          setAlertText("This is a success alert — create product detail success");
          //success顯示success的文字
        }else{
          setAlertSeverity('error');
          setAlertText("This is a error alert — Please contact the administrator regarding permission issues.");
          //erro顯示error 文字r    
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '800px',
      margin: 'auto',
      marginTop: 3,
      // borderRadius: '4px', 
      // backgroundColor: '#F5F5F5',

    }}>
      {(props.setData=== undefined)?<Typography align="left" variant="h4">Create Products</Typography>:""}
      <form onSubmit={handleSubmit}>
        <StyledBox boxShadow={3} >
          <Box display="flex" justifyContent="space-between">
            <Box sx={{ width: 'calc(50% - 16px)'}}>
              <Typography align="left" variant="subtitle1">Product Name</Typography>
              <TextField
                fullWidth
                label=""
                variant="outlined"
                margin={"dense"}
                name='productname'//{name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </Box>
            <Box sx={{ width: 'calc(50% - 16px)'}}>
              <Typography align="left" variant="subtitle1">Category</Typography>
              <Select 
                required
                fullWidth 
                native 
                id="grouped-select" 
                label=""  
                style={{marginTop: 7}}
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option aria-label="None" value="" />
                <optgroup label="Gift Ribbon">
                  <option value={1}>Silk ribbon</option>
                  <option value={2}>Polyester ribbon</option>
                  <option value={3}>Polyester ribbon</option>
                  <option value={4}>Paper ribbon</option>
                  <option value={5}>Sheer ribbon</option>
                  <option value={6}>Satin ribbon</option>
                  <option value={7}>Mesh ribbon</option>
                  <option value={8}>Lace ribbon</option>
                  <option value={9}>Metallic ribbon</option>
                  <option value={10}>Velvet ribbon</option>
                </optgroup>
                {/* <optgroup label="Category 2">
                  <option value={8}>Option 4</option>
                </optgroup> */}
              </Select>
            </Box>
          </Box>
          <Typography align="left" variant="subtitle1">Descriptione</Typography>
          <TextField
            fullWidth
            label=""
            variant="outlined"
            margin="normal"
            multiline
            rows={7}
            name='description'//{description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </StyledBox>
        <p></p>
        <StyledBox boxShadow={3} >
          <Typography align="left" variant="subtitle1">Media</Typography>
          <CreateImgFile getImgFile={getImgFile} name='selectImg' value={Image}/>
        </StyledBox>
        <p></p>
        <StyledBox boxShadow={3}>
          <Typography align="left" variant="subtitle1">Price</Typography>
          <TextField
            fullWidth
            label=""
            variant="outlined"
            margin="normal"
            type="number"
            name='price'//{price}
            value={price}
            inputProps={{ min: "0" }}
            onChange={(e) => setPrice(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </StyledBox>
        <p></p>
        <Box display="flex" justifyContent="space-between">
          <StyledBox boxShadow={3} sx={{ width: '49%',paddingTop:7}}>
            <Typography align="left" variant="subtitle1">Amount</Typography>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              margin="normal"
              type="number"
              name='amount'//{amount}
              value={amount}
              inputProps={{ min: "0" }}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </StyledBox>
          
          <StyledBox boxShadow={3} sx={{ width: '49%' }}>
            <Typography align="left" variant="subtitle1">Width</Typography>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              margin="normal"
              type="number"
              name='width'//{width}
              value={width}
              inputProps={{ min: "0" }}
              onChange={(e) => setWidth(e.target.value)}
              required
            />
            <Typography align="left" variant="subtitle1">Length</Typography>
            <TextField
              fullWidth
              label=""
              variant="outlined"
              margin="normal"
              type="number"
              name='height'
              value={height}
              inputProps={{ min: "0" }}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </StyledBox>
        </Box>
        <p></p>
        <Divider />

        {/* <Button t variant="contained" sx={{ mt: 2 }}>
         Save
        </Button> */}
        <Grid container justifyContent="flex-end">
          <Grid item xs={8}>
            <div style={alertStates}>
              <Alert variant="filled" severity={alertSeverity} sx={{ mt: 1 }}>
                {alertText}
              </Alert>
            </div>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
              maxWidth="sm" fullWidth={true} 
      >
        <DialogTitle>確認表單資料</DialogTitle>
        <DialogContent> 
            以下是表單資料：
            <p/>
            {
              /* 顯示表單資料 */
              formData.map(([key, value]) => {
                return (
                  <div key={key}>
                    {key === "image" ? (
                      
                      <img src={value} alt="Example image" style={{ width: "200px", height: "200px" }} />
                    ) : (
                      <Typography variant="body1">{key + " = " + value}</Typography>
                    )}
                  </div>
                );
              })
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>取消</Button>
          <Button onClick={handleDialogConfirm}>確認送出</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialog}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your account didn't provide edit!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          This account only provides browsing functionality and does not offer editing capabilities.
          If you have any questions, please contact the administrator.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      

    </Box>
  );
};

export default CreateProduct;
