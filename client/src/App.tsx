import React, {FC, useState, ChangeEvent} from 'react';
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { ITask } from "./Interfaces";
import TodoTask from './components/TodoTask';



const App:FC = () => {

  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    e.preventDefault();
    if(e.target.name === "task"){
      setTask(e.target.value);
    }
    else if(e.target.name === "description"){
      setDescription(e.target.value);
    }
    else{
      setDeadline(Number(e.target.value));
    }
  }

  const addTask = () : void => {
    const newTask = {taskName:task, taskDescription:description, deadline:deadline}
    setTodoList([...todoList, newTask])
    setTask("")
    setDescription("")
    setDeadline(0)
  }

  const completeTask = (taskname:string) :void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskname
    }))
  }


  return (
    <div className="App">
      {/* <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
        
      </div> */}
      <TodoForm/>
    </div>
  );
}

export default App;

