import React,{FC, useState, useRef, useContext,ChangeEvent} from 'react'
import classes from './TodoForm.module.css'
import TaskFilters from './TaskFilters'
import TodoModel,{filter} from "../models/todo";
import TodoList from './TodoList';

// interface Props{
//     todoList: TodoModel[];
//   }

const TodoForm:FC = () => {

    const [task, setTask] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<number>(0);
    const [todoList, setTodoList] = useState<TodoModel[]>([]);
    const [todoFilter, setTodoFilter] = useState<filter>(filter.all);

    const [loading,setloading] = useState(false)
    // const todocontext = useContext(TodoContext)
    // const addTodo = todocontext.addTodo

    const sorttodo =async (todolist:TodoModel[]) => {
        const sorted = todolist.sort((a,b) => {
            return b.deadline-a.deadline;
        })
        setTodoList(sorted)
    }

    const addTodoHandler = async (todo: TodoModel) => {
          const newTodo: TodoModel = {
          ...todo,
          createdAt: new Date().toISOString(),
        };
        setTodoList((prevTodos) => {
        return prevTodos.concat(newTodo);
        });
    }

      const removeTask = async (id: string) => {
        // setTodoList((prevTodos) => {
        //   console.log(prevTodos)
        //   return prevTodos.filter((eachtodo) => eachtodo.id !== id);
        // });
        // console.log(id)
        console.log(todoList)
        setTodoList(todoList.filter((task) => {
          return task.id !== id
        }))
      };

      const changeFilter = async (newfilter: filter) => {
        setTodoFilter(newfilter);

      }
    
      const checkTask = async (id: string) => {
        const targetTodoIndex = todoList.findIndex((todo) => todo.id === id);
        const targetTodo = todoList[targetTodoIndex];
        const updateTodo = { ...targetTodo, completed: !targetTodo.completed };
        let updateTodos = [...todoList];
        updateTodos[targetTodoIndex] = updateTodo;
        setTodoList(updateTodos);
      };
    
      const updateTask = async (id: string, textInput: string,description: string, deadline: number) => {
        const targetTodoIndex = todoList.findIndex((todo) => todo.id === id);
        const targetTodo = todoList[targetTodoIndex];
        const updateTodo: TodoModel = { ...targetTodo, name: textInput, description:description, deadline:deadline };
        let updateTodos = [...todoList];
        updateTodos[targetTodoIndex] = updateTodo;
        setTodoList(updateTodos);
      };

    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // if(e.target.name === "task"){
        //     setTask(e.target.value);
        //   }
        //   else if(e.target.name === "description"){
        //     setDescription(e.target.value);
        //   }
        //   else{
        //     setDeadline(Number(e.target.value));
        //   }
        const newTodo:TodoModel = {
            name: task,
            description: description,
            deadline: deadline,
            id: new Date().getTime().toString(),
            completed: false,
        }

        if (newTodo.name.trim() ===""){
            return
        }
        addTodoHandler(newTodo)
        setTask("")
        setDescription("")
        setDeadline(0)
        console.log(todoList)
    }

    return (
        <div className={classes.container}>
        <form  className={classes.form}>
            <input
            className={classes.form_input}
            id="todoText"
            type="text"
            maxLength={64}
            placeholder="Create a new task"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            ></input>
            <input
            className={classes.form_input}
            id="todoDesc"
            type="text"
            maxLength={64}
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></input>
            <input
            className={classes.form_input}
            id="todoDeadline"
            type="number"
            placeholder="Deadline/Priority"
            name='deadline'
            value={deadline}
            onChange={(e) => setDeadline(Number(e.target.value))}
            ></input>
            <button onClick={handleSubmit} >Create Task</button>
        </form>
        <TaskFilters todoList={todoList} todoFilter={todoFilter} changeFilter={changeFilter} />
        <TodoList todoList={todoList} todoFilter={todoFilter} checkTask={checkTask} removeTask={removeTask} updateTask={updateTask} />
        </div>
    );
    };
export default TodoForm;
