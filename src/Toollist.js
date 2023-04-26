import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { List,ListItem,ListItemButton,ListItemIcon,ListItemText,Divider } from '@mui/material';
import {Dashboard,TableView,Create,Settings} from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/system';


const ListStyles = styled(List)({
  
    flexGrow: 1,
    overflowY: 'auto',
});

function Toollist(props){
    // const [selectedIndex, setSelectedIndex] = useState(0);

    // const handleListItemClick = (event, index) => {
    //     setSelectedIndex(index);
    // };
    const ListInfo=[
      {text:'Dashbord',icon:<Dashboard /> },
      {text:'Create products',icon:<Create/>},
      {text:'Table',icon:<TableView/>},
      {text:'Drafts',icon:<MailIcon/>},

      // {text:'Dashbord',icon:<Dashboard /> },
      // {text:'Create products',icon:<Create/>},
      // {text:'Table',icon:<TableView/>},
      // {text:'Drafts',icon:<MailIcon/>},
      // {text:'Dashbord',icon:<Dashboard /> },
      // {text:'Create products',icon:<Create/>},
      // {text:'Table',icon:<TableView/>},
      // {text:'Drafts',icon:<MailIcon/>},
      // {text:'Dashbord',icon:<Dashboard /> },
      // {text:'Create products',icon:<Create/>},
      // {text:'Table',icon:<TableView/>},
      // {text:'Drafts',icon:<MailIcon/>},
      // {text:'Dashbord',icon:<Dashboard /> },
      // {text:'Create products',icon:<Create/>},
      // {text:'Table',icon:<TableView/>},
      // {text:'Drafts',icon:<MailIcon/>},

    ]
    return(
      <>
      <div style={{height: '83%',display: 'flex',flexDirection: 'column',justifyContent: 'space-between',}} >
        <ListStyles >
        {ListInfo.map((info, index) => (
          <React.Fragment key={index}>
            <ListItem button key={info.text} disablePadding 
            onClick={() => props.handleListItemClick(info.text)}
            // selected={selectedIndex === 0} 
              sx={{ 
                  display: 'block'
              }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: props.open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: props.open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {info.icon}
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={info.text} sx={{ opacity: props.open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))} 
      </ListStyles>
      </div>
      <p></p>
      <ListItemButton onClick={()=>{}}>
        <ListItemIcon  sx={{
                      minHeight: 30,
                      justifyContent: 'center',
                      px: 0,
                      
                    }}
        >
            <Settings fontSize="large"/>
            <ListItemText primary='Settings' sx={{ opacity: props.open ? 1 : 0 }} />
        </ListItemIcon>
      </ListItemButton>
      </>
    );
}
export default Toollist;