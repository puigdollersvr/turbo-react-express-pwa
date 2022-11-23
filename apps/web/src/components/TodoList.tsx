import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Delete, Remove, Visibility } from '@mui/icons-material';
import { useTodo } from '../hooks/useTodo';
import { useNavigate } from 'react-router-dom';

export default function TodoList() {

  const [checked, setChecked] = React.useState([0]);

  const { todos } = useTodo();
  const navigate = useNavigate();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSecondaryAction = (id:string) => {
    navigate(id)
  }

  return (
    <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {Array.isArray(todos) && todos.map((value, key) => {
            const labelId = `checkbox-list-label-${key}`;

            return (
            <ListItem
                key={`checkbox-list-item-${key}`}
                secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => handleSecondaryAction(value.id)}>
                    <Visibility />
                </IconButton>
                }
                disablePadding
            >
                <ListItemButton role={undefined} onClick={handleToggle(key)} dense>
                <ListItemIcon>
                    <Checkbox
                    edge="start"
                    checked={checked.indexOf(key) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.title}`} />
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    </>
  );
}