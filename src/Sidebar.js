import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar,Divider } from '@mui/material';
import { Dashboard as DashboardIcon, TableChart as TableIcon } from '@mui/icons-material';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    background: 'linear-gradient(to bottom, #5B5B5B, #000000)',
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    margin: '10px',
    height:'100%',
}));

function Sidebar() {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <StyledDrawer variant="permanent">
        <Divider />
        <StyledToolbar >
            <List>
                <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                    <TableIcon />
                </ListItemIcon>
                <ListItemText primary="Table" />
                </ListItem>
            </List>
        </StyledToolbar >
    </StyledDrawer>
  );
}

export default Sidebar;
