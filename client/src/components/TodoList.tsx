import React, { useContext, useEffect, useState } from "react";
import classes from "./TodoList.module.css";
import TodoDetails from "./TodoDetails";
import TodoModel, { filter } from "../models/todo";

interface Props{
  todoList: TodoModel[];
  todoFilter: filter;
  removeTask(id: string): void;
  updateTask(id: string, textInput: string,description: string, deadline: number): void;
  checkTask(id: string): void;
}

const TodoList = ({todoList,todoFilter, removeTask,updateTask,checkTask}:Props) => {

  const filterOrder=filter.all;

  // const todoCtx = useContext(TodoContext);

  // const todoList = todoCtx.todoList;
  // const getTodo = todoCtx.getTodo;
  // const filterOrder = todoCtx.filter;

  // useEffect(() => {
  //   getTodo();
  // }, []);
  // console.log(todoList);
  const allTodos = todoFilter ===filter.all &&
    todoList.map((todo) => <TodoDetails key={todo.id} todo={todo} todoList={todoList} checkTask={checkTask} removeTask={removeTask} updateTask={updateTask}/>);
  console.log(todoList);
  const completedTodos = todoFilter===filter.completed &&
    todoList
      .filter((todo) => todo.completed === true)
      .map((todo) => <TodoDetails key={todo.id} todo={todo} todoList={todoList} checkTask={checkTask} removeTask={removeTask} updateTask={updateTask}/>);

  const activeTodos = todoFilter===filter.active &&
    todoList
      .filter((todo) => todo.completed === false)
      .map((todo) => <TodoDetails key={todo.id} todo={todo} todoList={todoList} checkTask={checkTask} removeTask={removeTask} updateTask={updateTask}/>);

  // console.log(allTodos);
  // console.log(completedTodos);
  // console.log(activeTodos)

  return (
    <div className={classes.todoList}>
      {allTodos}

      {completedTodos}

      {activeTodos}
    </div>
  );
};

export default TodoList;