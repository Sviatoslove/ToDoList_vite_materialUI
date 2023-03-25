import React, { useEffect } from 'react';
import AddForm from '../components/UI/AddForm';
import ListTodos from '../components/UI/ListTodos';
import { Paper } from '@mui/material';
import { useTodos } from '../store/store';

const Main = () => {
 const { fetchTodos } = useTodos()

 useEffect(() => {
  fetchTodos()
 }, [])

 const todos = useTodos().getTodos()

 return ( <>
  <Paper sx={{margin: 'auto', maxWidth: 900, overflow: 'hidden'}}>
   <AddForm/>
   <ListTodos todos={todos} />
  </Paper>
 </> );
}
 
export default Main