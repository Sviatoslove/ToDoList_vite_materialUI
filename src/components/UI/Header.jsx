import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import Brightness4Icon from '@mui/icons-material/Brightness4';


export default function MenuAppBar({theme, ...rest}) {
 const [auth, setAuth] = React.useState(true);
 const [anchorEl, setAnchorEl] = React.useState(null);

 const handleChange = (event) => {
   setAuth(event.target.checked);
 };

 const handleMenu = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };

 return (
   <Box component='header' sx={{ flexGrow: 1 }}>
     <AppBar position="static">
       <Toolbar>
         <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
         >
           <MenuBookIcon fontSize='large'/>
         </IconButton>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           TodoApp
         </Typography>
         <IconButton sx={{ ml: 1 }} {...rest} color="inherit">
          {theme.palette.mode === 'dark' ? <SolarPowerIcon /> : <Brightness4Icon />}
         </IconButton>
         {auth && (
           <div>
             <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleMenu}
               color="inherit"
             >
               <AccountCircle fontSize='large'/>
             </IconButton>
             <Menu
               id="menu-appbar"
               anchorEl={anchorEl}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorEl)}
               onClose={handleClose}
             >
               <MenuItem onClick={handleClose}>Profile</MenuItem>
               <MenuItem onClick={handleClose}>My account</MenuItem>
             </Menu>
           </div>
         )}
       </Toolbar>
     </AppBar>
   </Box>
 );
}