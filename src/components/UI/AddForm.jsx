import React, { useRef } from 'react';
import { AppBar, Button, Grid, TextField, Toolbar } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useTodos } from '../../store/store';


const AddForm = () => {
 const addTodo = useTodos(state => state.addTodo)
 const removeSelected = useTodos(state => state.removeSelected)
 const input = useRef()

 const handleAdd = (current) => {
  addTodo(current.value)
  current.value = ''
 }

 const handleRemoveSelected = () => {
  removeSelected()
 }
 return ( 
  <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="write the task in this field"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant="standard"
              inputRef={input}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => handleAdd(input.current)}
            >
              Add todo
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
              onClick={handleRemoveSelected}
            >
              Remove selected
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
 
export default AddForm;