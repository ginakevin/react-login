import * as React from 'react';
import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled, useTheme,ThemeProvider, createTheme  } from '@mui/material/styles';
import {
  Paper,
} from '@mui/material'
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Toollist from './Toollist';
import HeaduUserInfo from './HeaduUserInfo';
import Content from './Content';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  height:'51px',
  // ...theme.mixins.toolbar,
  backgroundColor: '#D0D0D0	',
  // background: 'linear-gradient(to bottom, #5B5B5B, #000000)'
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const MainTheme = createTheme({
  palette: {
    background: {
      default: '#F0F0F0',
    },
  },
});
// const pages = [
//   { path: "/CreateProduct", component: CreateProduct },
  // { path: "/page2", component: Page2 },
  // { path: "/page3", component: Page3 },
// ];
export default function HomePage() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [activeContent, setActiveContent] = useState('Dashbord');

  const handleListItemClick = (content) => {
    setActiveContent(content);
  };
  return (
    <ThemeProvider theme={MainTheme}>
      
      <CssBaseline />
      <Box sx={{ display: 'flex'}}>
        <AppBar position="fixed" open={open}>
          <Toolbar variant="dense"
          sx={{ 
              backgroundColor: '#F0F0F0',
              // background: 'linear-gradient(to bottom, #D0D0D0, #BEBEBE)',
              // border: '1px solid red',
              }}>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                
              }}
            >
              <MenuIcon />
            </IconButton>
              {/* <Typography variant="h6" noWrap component="div">
              Mini variant drawer
              </Typography> */}
            <HeaduUserInfo ></HeaduUserInfo>
          </Toolbar>
        </AppBar>
        
        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (<ChevronRightIcon  style={{color: '#000'}} /> 
              ): (
              <ChevronLeftIcon style={{color: '#000'}}/>)}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Paper sx={{ backgroundColor: '#F0F0F0',height:'100%' }}>
              <Toollist open={open} handleListItemClick={handleListItemClick}/>
          </Paper>
        </Drawer>
      
        <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
           <Content activeContent={activeContent} />
          {/* <CreateProduct/> */}
        </Box>
       
      </Box>
    </ThemeProvider>
  );
}