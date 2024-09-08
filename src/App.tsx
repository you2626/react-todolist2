import { useState, useEffect, ChangeEvent } from 'react';
import Title from './components/Title';
import InputForm from './components/InputForm';
import "./App.css";
import AddForm from './components/AddForm';

interface Todo {
  id: number;
  title: string;
  status: 'notStarted' | 'inProgress' | 'done';
}

type Filter = 'all' | 'notStarted' | 'inProgress' | 'done';


const App = () => {
  
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: '買い物に行く', status: 'done' },
    { id: 2, title: '勉強する', status: 'notStarted' },
    { id: 3, title: '企画書の提出', status: 'inProgress' }
  ]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoId, setTodoId] = useState<number>(todos.length + 1);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])

  const [filter, setFilter] = useState<Filter>('all')
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleAddFormChanges = (e:ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleEditFormChanges = (e:ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  };

  const resetFormInput = () => {
    setTodoTitle('');
  };

  const handleOpenEditForm = (todo:Todo) => {
    setIsEditable(true);
    setEditId(todo.id);
    setNewTitle(todo.title);
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId(undefined);
  }

  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted' }]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  const handleDeleteTodo = (targetTodo:Todo) => {
    setTodos(todos.filter((todo) => todo.id !== targetTodo.id));
  };

  const handleEditTodo = () => {
    const newTodos = todos.map((todo) => ({ ...todo }))

    setTodos(() =>
      newTodos.map((todo) =>
        todo.id === editId ? { ...todo, title: newTitle } : todo
      )
    );
    setNewTitle('');
    handleCloseEditForm();
  };

  const handleStatusChange = (id:number , e:ChangeEvent<HTMLSelectElement>) => {
    const newStatus =e.target.value as Todo["status"];
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, status: newStatus } : todo
      ));
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
          break
        case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
          break
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
          break
        default:
          setFilteredTodos(todos)
      }
    }
    filteringTodos()
  }, [filter, todos])

  return (
  <>
  <Title />
  
  {isEditable ? (
        <>
        <AddForm
        newTitle={newTitle}
        handleEditFormChanges={handleEditFormChanges}
        handleEditTodo={handleEditTodo}
        handleCloseEditForm={handleCloseEditForm}
      />
        </>
      ) : (
        <>
        <InputForm
                    todoTitle={todoTitle}
                    handleAddFormChanges={handleAddFormChanges}
                    handleAddTodo={handleAddTodo}
                    />
        
        </>
      )}

      <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
        <option value="all">すべて</option>
        <option value="notStarted">未着手</option>
        <option value="inProgress">作業中</option>
        <option value="done">完了</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo.id, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
      </>
  )
}

export default App;
