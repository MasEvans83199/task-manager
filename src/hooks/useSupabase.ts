import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Task } from '../types'
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'

export const useSupabase = (supabase: SupabaseClient) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    fetchTasks()
    
    const newChannel = supabase.channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
        console.log('Change received!', payload)
        fetchTasks()
      })
      .subscribe()
  
    setChannel(newChannel)
  
    return () => {
      if (channel) channel.unsubscribe()
    }
  }, [])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.log('error', error)
    else setTasks(data)
  }

  const addTask = async (task: Omit<Task, 'id' | 'user_id'>) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...task, user_id: user?.id }])
    
    if (error) console.log('error', error)
    else fetchTasks()
  }

  const toggleTask = async (id: number) => {
    const { data: currentTask, error: fetchError } = await supabase
      .from('tasks')
      .select('status')
      .eq('id', id)
      .single();
  
    if (fetchError) {
      console.log('error fetching task', fetchError);
      return;
    }
  
    const newStatus = currentTask.status === 'pending' ? 'completed' : 'pending';
    const { data, error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', id);
  
    if (error) console.log('error updating task', error);
    else fetchTasks();
  };
  
  const deleteTask = async (id: number) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
  
    if (error) console.log('error', error);
    else fetchTasks();
  };
  
  return { tasks, addTask, toggleTask, deleteTask };  
  
}