import { useState,useRef } from "react";
import { 
  Box,
  Button, 
  Typography,
  styled,
  Card, 
  CardMedia, 
  CardActions,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ECECFF	',
  color: '#2828FF',
  '&:hover': {
    backgroundColor: '#ECECFF',
    color: '#000079',
  },
}));

const CreateImgFile = (props) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState((props.value==='')?'':props.value);
  const [open, setOpen] = useState(false);


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    imgToBase64(file);
    // let img=URL.createObjectURL(file);
    // setFiles(img);
    // props.getImgFile(img);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    imgToBase64(file);
    // let img=URL.createObjectURL(file);
    // setFiles(img);
    // props.getImgFile(img);
  };
  const imgToBase64=(file)=>{
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles(reader.result);
        props.getImgFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // let img=URL.createObjectURL(file);
    // setFiles(img);
    // props.getImgFile(img);
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // 執行確認操作
    setOpen(false);
    setFiles('');
    props.getImgFile('');
  };
  // const borderColor = (!props.value.trim())?'red':'gray';
  return (
    <>
    <Box
      sx={{
        border: "dashed 1px gray",
        borderColor: `${(!props.value.trim())?'red':'gray'}` ,
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        height: "300px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
       
      
      {
      (files.length===0)?

        <Box  sx={{ flexGrow: 1, }}>
          <ColorButton variant="contained" component="label">
            Add File
            <input type="file" accept="image/*" hidden onChange={handleFileSelect} />
          </ColorButton>
          <Typography variant="subtitle1" sx={{color:'gray'}}> drag or click to create</Typography>
        </Box> :

        <Box overflow="auto" width="50%" height="100%"
          sx={{
            flexGrow: 1, 
            // border: '2px solid red',
            justifyContent: "center",
            display: "flex",
            alignItems: "center"
            }}>
        {/* {files.map((file, index) => (
          <img key={index} src={URL.createObjectURL(file)} alt="" style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }} />
        ))} */}
          <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 210 }}
                  image={files}
                />
                <Divider />
                <CardActions  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button color="primary"  onClick={handleOpen}>Delete</Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirm Action</DialogTitle>
                        <DialogContent>
                          <p>Are you sure you want to perform this action?</p>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleConfirm} color="primary" autoFocus>
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                  <Button color="primary" htmlFor="file-input" onClick={handleButtonClick}>
                    Reset 
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />
                </CardActions>
          </Card>
        </Box>
      }
    
    </Box>
    <Typography variant="caption" display="block" gutterBottom>
        {(!props.value.trim())?'please pick one picture':''}
    </Typography>
    </>
  );
};
export default CreateImgFile;
