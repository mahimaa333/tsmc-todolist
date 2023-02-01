import React, { useContext,useState } from "react";
import classes from "./TaskFilters.module.css";
import TodoModel, { filter } from "../models/todo";

interface Props{
  todoList:TodoModel[];
  todoFilter: filter;
  changeFilter(newFilter: filter): void;
}


const TaskFilters = ({todoList,todoFilter,changeFilter}:Props) => {
  // const todoCtx = useContext(TodoContext);
  // const changeFilter = todoCtx.changeFilter;
  // const filterOrder = todoCtx.filter;
  // console.log(todoCtx);
  const [filterOrder, setFilterOrder] = useState<filter>(filter.all);

  const changeFilterHandler = (filterOrder: filter) => {
    setFilterOrder(filterOrder);
  };
  const changeFilterOrder = (filter: filter) => {
    changeFilterHandler(filter);
  };

  return (
    <ul className={classes["task-filters"]}>
      <li onClick={changeFilter.bind(null, filter.all)}>
        <a
          className={todoFilter === filter.all ? classes.active : ""}
          href="#"
        >
          View All
        </a>
      </li>
      <li onClick={changeFilter.bind(null, filter.active)}>
        <a
          className={todoFilter === filter.active ? classes.active : ""}
          href="#"
        >
          Active
        </a>
      </li>
      <li onClick={changeFilter.bind(null, filter.completed)}>
        <a
          className={todoFilter === filter.completed ? classes.active : ""}
          href="#"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default TaskFilters;