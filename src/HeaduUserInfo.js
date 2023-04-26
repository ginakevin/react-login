import * as React from 'react';
import { useState,useContext } from 'react';
import {
    Box,
    Avatar,
    Typography,
    Grid,
    Popover,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import {
    PersonSharp,
    Logout,
    Settings
} from '@mui/icons-material';
import {AuthContext} from './ContextInfo';
import { useNavigate } from 'react-router';

function HeaduUserInfo(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'John Doe', avatarUrl: 'https://example.com/avatar.png' });
    const getSessionObj = sessionStorage.getItem("sessionAut");
    const auth = JSON.parse(getSessionObj);
    // const { auth } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout=()=>{
        setAnchorEl(null);
        navigate('/');
        sessionStorage.removeItem('sessionAut');
    }
    const open = Boolean(anchorEl);
    const id = open ? 'user-menu-popover' : undefined;
    return (
        <>
          <Grid container justifyContent="flex-end" >
          {/* <Grid sx={{marginRight:4}}> */}
            <Box onClick={handleClick} sx={{display: "flex", justifyContent: "flex-end" ,alignItems: 'center',
                        borderRadius: '2px',
                        // marginRight:3,
                        '&:hover': {
                            backgroundColor: '#E0E0E0'
                          }
            }}>
                <Avatar  alt={user.name} sx={{ margin: '7px',width: 30, height: 30 }} >
                    <PersonSharp fontSize="medium" />
                </Avatar>
                <Typography color="#000000" variant="h6">{auth.username}</Typography>
             </Box>
        </Grid>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
        >
            <Box sx={{ p: 2 }}>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                     <Logout fontSize="small" />
                </ListItemIcon>
                Login Out
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small"/>
                </ListItemIcon>
                Settings
            </MenuItem> */}
            </Box>
        </Popover>
     </>
      
    );
}
export default HeaduUserInfo;
