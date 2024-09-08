export interface Todo {
  id: number;
  title: string;
  status: 'notStarted' | 'inProgress' | 'done';
}

export type Filter = 'all' | 'notStarted' | 'inProgress' | 'done';
