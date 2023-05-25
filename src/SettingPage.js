import React,{useState} from 'react';
import { Container, Typography, TextField, Button,Alert } from '@mui/material';

const SettingPage = () => {

  const [alertStates,setAlertStates]=useState({display:'none'});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setAlertStates({display:'block'});
    // 处理表单提交逻辑
  };
  const alertCloase=()=>{
    setAlertStates({display:'none'});
  }

  return (
    <Container maxWidth="sm" sx={{marginTop: 5,}}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Settings
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          id="name"
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          // 添加其他表单字段属性
        />
        <TextField
          id="email"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          // 添加其他表单字段属性
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
        <div style={alertStates}>
            <Alert variant="filled" severity="error" sx={{ mt: 1 }} onClose={alertCloase}>
            This is a error alert — This feature is not yet available.
            </Alert>
        </div>
    </Container>
  );
};

export default SettingPage;
