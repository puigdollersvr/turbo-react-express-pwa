import { Fab } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddButton = () => {

    const navigate = useNavigate();

    return (
        <Fab 
            color="primary" 
            aria-label="add" 
            sx={{'position': 'absolute', 'bottom': 50, 'right': 50}} 
            onClick={ () => navigate('create')}
        >
            <AddIcon />
        </Fab>
    )
}

export default AddButton;