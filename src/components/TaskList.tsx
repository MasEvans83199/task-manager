import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} dense button onClick={() => onToggleTask(task.id)}>
          <Checkbox
            edge="start"
            checked={task.status === 'completed'}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText 
            primary={task.title}
            secondary={task.description}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;