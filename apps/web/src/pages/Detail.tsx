import { Button, FormControlLabel, FormGroup, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useTodo } from '../hooks/useTodo';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


const Detail = () => {

    const { id } = useParams();
    const { todos } = useTodo(id);

    return <Stack spacing={4} direction="column" justifyContent={"center"}>
        <Stack spacing={0} direction="column" justifyContent={"center"}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {`${todos?.user}`}
            </Typography>
            <Typography variant="h5" component="div">
                {`${todos?.title}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {`${todos.done ? 'Done' : 'Pending'}`}
            </Typography>
            <Typography variant="body2">
                {`${todos?.notes}`}
            </Typography>
            <TextField
                  required
                  id="filled-required"
                  label="title"
                  defaultValue={todos.title || 'dsasdds'}
                  variant="standard"
            />
            <TextField
                  id="filled-required"
                  label="notes"
                  defaultValue={todos.notes}
                  variant="standard"
            />
           
            <FormGroup>
                <FormControlLabel 
                    control={
                        <Checkbox checked={todos.done} />
                    } 
                    label="Done" 
                />
            </FormGroup>
        </Stack>
        <Stack spacing={2} direction="row" justifyContent={"center"}>
                <Button variant="outlined">Edit</Button>
                <Button variant="outlined" color="error">Remove</Button>
        </Stack>  
    </Stack>
}

export default Detail