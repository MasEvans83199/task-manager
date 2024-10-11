export interface Task {
    id: number
    user_id: string
    title: string
    description: string
    status: 'pending' | 'completed'
    due_date: string
  }  