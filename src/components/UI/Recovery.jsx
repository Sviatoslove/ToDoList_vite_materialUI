import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Grid, Paper, Container, Typography, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useTheme } from '../../store/store';


export default function Recovery() {
 const [data, setData] = useState({email: '', password: '', confirm_password: ''})
 const [errors, setErrors] = useState({})
 const { getCurrentTheme } = useTheme()


 const handleSubmit = (event) => {
  event.preventDefault()
  validate()
  if(isValid) return
 }

 const handleChange = ({ target }) => {
  setData(state => ({ ...state, [target.name]: target.value }))
 }

 const validationSchema = yup.object().shape({
  confirm_password: data.password.length === 8 ? yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required('Password is required') : null,
  password: yup.string().min(8).required('Password is required'),
  email: yup.string().required('Email is required').email('Invalid Email adress')
 })

 const validate = async () => {
  try{
   await validationSchema.validate(data)
   setErrors({})
  }catch(error) {
   setErrors({ [error.path]: error.message })
  }
 }
 useEffect(() => {
  if((data.email || data.password || data.confirm_password) !== '') validate()
 }, [data])

 const isValid = !!Object.keys(errors).length

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <Paper sx={{margin: 'auto', maxWidth: 900, textAlign: 'center', p: 5}}>
          <Avatar sx={{bgcolor: 'secondary.main', margin: 'auto' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{mt: 1}} component="h1" variant="h5">
           Password recovery
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={data.email}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
              fullWidth
              value={data.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              error={!!errors.confirm_password}
              helperText={errors.confirm_password}
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Repeat password"
              type="confirm_password"
              id="confirm_password"
              autoComplete="current-confirm_password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid sx={{flexFlow: 'column'}} container>
              <Grid item xs>
               <Link to="/login" style={{ color: getCurrentTheme(), textDecoration: 'none' }}>
                Do you have an account? Sign In
               </Link>
              </Grid>
              <Grid item>
                <Link to="/registr" style={{ color: getCurrentTheme(), textDecoration: 'none' }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Paper>
        </Box>
      </Container>
  );
}