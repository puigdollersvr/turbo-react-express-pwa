import { Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import { useTodo } from '../hooks/useTodo';

const Detail = () => {

    const { id } = useParams();
    const { todos } = useTodo(id);

    return  <>
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
    </>
}

export default Detail