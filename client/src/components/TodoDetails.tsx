import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faEdit,faCheckCircle,faSave } from "@fortawesome/free-solid-svg-icons";
import classes from "./TodoDetails.module.css";
import TodoModel, { filter } from "../models/todo";
import 'font-awesome/css/font-awesome.min.css';

// library.add(faCheckCircle,faEdit,faEraser)
interface TodoDetailsProps {
  todo: TodoModel;
  todoList:TodoModel[];
  removeTask(id: string): void;
  updateTask(id: string, textInput: string, description: string, deadline: number): void;
  checkTask(id: string): void;
}

const TodoDetails = ({ todo,todoList, removeTask, updateTask, checkTask}: TodoDetailsProps) => {
  // console.log(todo)
  const [todoText, setTodoText] = useState<string>(todo.name);
  const [todoDescription, setTodoDescription] = useState<string>(todo.description);
  const [todoDeadline, setTodoDeadline] = useState<number>(todo.deadline);
  const [editing, setEditing] = useState<boolean>(false);

  const [todoLists, setTodoList] = useState<TodoModel[]>([]);
  // setTodoList(todoList);
    const [filterOrder, setFilterOrder] = useState<filter>(filter.all);
  
    const changeFilterHandler = (filterOrder: filter) => {
      setFilterOrder(filterOrder);
    };

    // const addTask = () : void => {
    //   const newTask = {taskName:task, taskDescription:description, deadline:deadline}
    //   setTodoList([...todoList, newTask])
    //   setTask("")
    //   setDescription("")
    //   setDeadline(0)
    // }
  
    // const getTodoHandler = async () => {
    //   const loadedTodos = await getTodosAPI();
    //   setTodos(loadedTodos);
    // };
  
    const updatingTodoHandler = async (id: string, textInput: string) => {
      const targetTodoIndex = todoList.findIndex((todo) => todo.id === id);
      const targetTodo = todoList[targetTodoIndex];
      const updateTodo: TodoModel = { ...targetTodo, name: textInput };
      let updateTodos = [...todoList];
      updateTodos[targetTodoIndex] = updateTodo;
      setTodoList(updateTodos);
    };

  // const todoCtx = useContext(TodoContext);
  // const removeTodo = todoCtx.removeTodo;
  // const checkTodo = todoCtx.checkTodo;
  // const updateTodo = todoCtx.updateTodo;

  const saveEditTodoHandler = () => {
    updateTask(todo.id!, todoText,todoDescription,todoDeadline);
    setEditing(false);
  };

  const onEnterPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      saveEditTodoHandler();
      setEditing(false);
      return;
    }
  };
  const todo_completed = todo.completed ? classes["todo-item_completed"] : "";

  const todo_editing = editing ? classes["todo-item_editing"] : "";

  const hide = editing ? classes.hide : "";

  return (
    <div className={`${classes.todo_item} ${todo_completed} ${todo_editing}`}>
      <div className={classes.cell}>
        <button
          className={`${classes.icon} ${classes.checkIcon} ${hide}`}
          onClick={checkTask.bind(null,todo.id)}
        >
          {/* <i className="far fa-check-circle"></i> */}
          <FontAwesomeIcon icon={faCheckCircle}/>
        </button>
      </div>
      <div className={classes.cell}>
      <div>
        {!editing && <div className={classes.title}>{todoText}</div>}
        {editing && (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
        )}
        </div>
        <div>
         {!editing && <div className={classes.title}>{todoDescription}</div>}
        {editing && (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          ></input>
        )}
        </div>
        <div>
        {!editing && <div className={classes.title}>{todoDeadline}</div>}
        {editing && (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoDeadline}
            onChange={(e) => setTodoDeadline(Number(e.target.value))}
          ></input>
        )}
        </div>
      </div>

      <div className={classes.cell}>
        <button
          className={`${classes.icon} ${hide}`}
          onClick={() => setEditing(true)}
        >
          {/* <i className="fas fa-edit"></i> */}
          <FontAwesomeIcon icon={faEdit}/>
        </button>
        <button
          className={`${classes.icon} ${hide}`}
          onClick={removeTask.bind(null, todo.id)}
        >
          {/* <i className="fas fa-eraser"></i> */}
          <FontAwesomeIcon icon={faEraser}/>
        </button>
        <button
          className={`${classes.icon} ${!editing ? classes.hide : ""}`}
          onClick={saveEditTodoHandler}
        >
          <FontAwesomeIcon icon={faSave}/>
        </button>
      </div>
    </div>
  );
};

export default TodoDetails;

// Adding edit function, need to figure out a way to turn of Editng and Change todo TExt in the same time