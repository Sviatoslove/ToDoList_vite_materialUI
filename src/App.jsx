import { Box, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import MenuAppBar from './components/UI/Header';
import { useTheme } from './store/store';
import { Navigate, Route, Routes } from 'react-router-dom';
import Main from './layouts/Main';
import Authorization from './layouts/Authorization';

function App() {
 const { theme, toggleTheme } = useTheme()

 return (
  <div className="App">
   <ThemeProvider theme={theme}>
   <MenuAppBar theme={theme} onClick={toggleTheme}/>
   <Box component='main' sx={{height: '100vh', py: 5}}>
    <Routes>
     <Route path='/' element={<Main />}/>
     <Route path='/:auth?' element={<Authorization />}/>
     <Route element={<Navigate to="/login" replace />}/>
    </Routes>
   </Box>
   </ThemeProvider>
  </div>
 )
}

export default App
