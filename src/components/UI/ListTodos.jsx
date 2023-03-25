import { List, Typography } from '@mui/material';
import React from 'react';
import { useTodos } from '../../store/store';
import Skeleton from '../common/Skeleton';
import TodoItem from './TodoItem';

const ListTodos = ({todos}) => {
 const loading = useTodos(state => state.loading)
 return ( 
  <List sx={{ pb: 0 }} >
   {loading && <Skeleton />}
   {todos.length || loading ? todos.map(item => <TodoItem key={item._id} {...item}/>) : <Typography sx={{textAlign: 'center', color: 'gray', py: 5}}>List is empty</Typography>}
  </List>
 );
}
 
export default ListTodos;