import { Button, FormControlLabel, FormGroup } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from '../hooks/useTodo';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';



const EditForm = () => {

    const { id } = useParams();
    const { todos, isLoading, updateTodo, createTodo, removeTodo } = useTodo(id);
    const [ isFormEnabled, setIsFormEnabled] = useState(id ? false : true);
    const [ title, setTitle] = useState('');
    const [ notes, setNotes] = useState('');
    const [ done, setDone] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (todos) {
            setTitle(todos.title);
            setNotes(todos.notes);
            setDone(todos.done || false);
        }
       
    },[todos])


    const handleEdit = async () => {
        if (id) {
            if (isFormEnabled) {
                await updateTodo({title, notes, done});
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
            navigate('/todos');
        }
        
    }

    const handleRemove = async () => {
        id && await removeTodo()   
        navigate('/todos')
    }
  

    return isLoading ? <></> : <Stack spacing={4} direction="column" justifyContent={"center"}>
        <Stack spacing={0} direction="column" justifyContent={"center"}>
            <TextField
                required
                disabled = {!isFormEnabled}
                id="filled-required"
                label="title"
                defaultValue= {todos.title}
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                disabled = {!isFormEnabled}
                id="filled-required"
                label="notes"
                defaultValue={todos.notes}
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
                <Button variant="outlined" onClick={handleEdit}>{ id ? isFormEnabled ? 'Save' : 'Edit' : 'Save'}</Button>
                <Button variant="outlined" color="error" onClick={handleRemove}>{id ? 'Remove' : 'Cancel'}</Button>
        </Stack>  
    </Stack>
}

export default EditForm