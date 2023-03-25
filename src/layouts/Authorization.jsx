import React from 'react';
import { useParams } from 'react-router-dom';
import Login from '../components/UI/Login';
import Recovery from '../components/UI/Recovery';
import Registration from '../components/UI/Registr';

const Authorization = () => {
 const { auth } = useParams()

 switch(auth) {
  case 'login':
   return <Login/>
  case 'registr':
    return <Registration/>
  case 'recovery':
    return <Recovery/>
 }
 
}
 
export default Authorization;