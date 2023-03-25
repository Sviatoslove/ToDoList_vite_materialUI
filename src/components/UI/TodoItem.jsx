import { IconButton, Input, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import CheCkbox from '../common/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import EditIcon from '@mui/icons-material/Edit'
import { useTodos } from '../../store/store';
import { displayDate } from '../../utils/displayDate';

const TodoItem = ({_id, content, created_at, completed}) => {
 const [ text, setText ] = useState(content)
 const [ edit, setEdit ] = useState(false)

 const removeTodo = useTodos(state => state.removeTodo)
 const editTodo = useTodos(state => state.editTodo)
 const completedTodo = useTodos(state => state.completedTodo)

 const handleComplete = id => {
  completedTodo(id)
 }

 const handleRemove = id => {
  removeTodo(id)
 }

 const handleEdit = id => {
  editTodo(id, text)
  setEdit(false)
 }

 return ( 
  <ListItem divider>
   <CheCkbox value={completed} onChange={() => handleComplete(_id)}/>
   <Input sx={{ flexGrow: 1 }} value={text} onChange={(e) => setText(e.target.value)} disabled={!edit}/>
   <Typography sx={{ mx: 3 }}>{displayDate(created_at)}</Typography>
   { !edit ? 
    <IconButton color='primary' onClick={() => setEdit(true)}>
     <EditIcon/>
    </IconButton> : 
    <IconButton color='success' onClick={() => handleEdit(_id)}>
     <TaskAltIcon/>
    </IconButton>
   }
   
   <IconButton color='error' onClick={() => handleRemove(_id)}>
    <DeleteIcon/>
   </IconButton>
  </ListItem>
  );
}
 
export default TodoItem;