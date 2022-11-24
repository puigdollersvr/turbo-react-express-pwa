import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useEffect, useState } from 'react';
import { Container, FormGroup, FormControlLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useTodo } from '../hooks/useTodo';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog({todo, open, setOpen, setSelectedTodo}: any) {  
  //
  //const { id } = useParams();
  const {isLoading, updateTodo, createTodo, removeTodo } = useTodo(todo && todo.id);
  const [ isFormEnabled, setIsFormEnabled] = useState(todo && todo.id ? false : true);
  const [ title, setTitle] = useState('');
  const [ notes, setNotes] = useState('');
  const [ done, setDone] = useState(false);


  useEffect(() => {
      if (todo) {
          setIsFormEnabled(todo && todo.id ? false : true);
          setTitle(todo.title);
          setNotes(todo.notes);
          setDone(todo.done || false);
      }
    
  },[todo])


  const handleEdit = async () => {
      if (todo && todo.id) {
          if (isFormEnabled) {
              await updateTodo({title, notes, done});
              setSelectedTodo({});
              window.location.reload();
          }
          setIsFormEnabled(!isFormEnabled);
          
      } else {
          await createTodo({
              title, 
              notes, 
              done, 
              start: 1,
              end: 1000000 
          });
          setSelectedTodo({});
          window.location.reload();
          //navigate('/todos');
      }
      
  }

  const handleRemove = async () => {
      todo.id && await removeTodo()
      setSelectedTodo({});
      window.location.reload()   
      //navigate('/todos')
  }




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTodo({});
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {todo.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth='lg' sx={{"marginTop":"50px"}}>
          
          {/**/}
          
          <Stack spacing={4} direction="column" justifyContent={"center"}>
              <Stack spacing={0} direction="column" justifyContent={"center"}>
                  <TextField
                      required
                      disabled = {!isFormEnabled}
                      id="filled-required"
                      label="title"
                      defaultValue= {todo.title}
                      variant="standard"
                      onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                      disabled = {!isFormEnabled}
                      id="filled-required"
                      label="notes"
                      defaultValue={todo.notes}
                      variant="standard"
                      onChange={(e) => setNotes(e.target.value)}
                  />
                  <FormGroup>
                      <FormControlLabel
                          disabled = {!isFormEnabled}
                          control={
                              <Checkbox 
                                  checked={done} 
                                  onChange={(e) => setDone(e.target.checked)}
                              />
                          } 
                          label="Done" 
                      />
                  </FormGroup>
              </Stack>
              <Stack spacing={2} direction="row" justifyContent={"center"}>
                <Button variant="outlined" onClick={handleEdit}>{ todo.id ? isFormEnabled ? 'Save' : 'Edit' : 'Save'}</Button>
                <Button variant="outlined" color="error" onClick={handleRemove}>{todo.id ? 'Remove' : 'Cancel'}</Button>
              </Stack>  
          </Stack>

          {/**/}

        </Container>
       
      </Dialog>
    </div>
  );
}