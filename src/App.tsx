import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import Header from './components/Header'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { useSupabase } from './hooks/useSupabase';
import { supabase } from './utils/supabase';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useSupabase(supabase);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Task Manager
          </Typography>
          <TaskForm onAddTask={addTask} />
          <Box my={4}>
            <TaskList 
              tasks={tasks} 
              onToggleTask={toggleTask} 
              onDeleteTask={deleteTask} 
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
