import React from "react";
import { FilterValueType } from "./App";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  title: string;
  placeholder: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  addTask: (title: string, id: string) => void;
  changeCheckbox: (id: string, todolistId: string) => void;
  filter: FilterValueType;
  deleteTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  function deleteTodolist() {
    props.deleteTodolist(props.id);
  }

  function onAllButtonClick() {
    props.changeFilter("All", props.id);
  }
  function onActiveButtonClick() {
    props.changeFilter("Active", props.id);
  }
  function onCompletedButtonClick() {
    props.changeFilter("Completed", props.id);
  }
  return (
    <div>
      <h3>
        {props.title}
        <button onClick={deleteTodolist}>X</button>
      </h3>
      <AddItemForm
        addTask={props.addTask}
        id={props.id}
        placeholder={props.placeholder}
      />

      <ul>
        {props.tasks.map((task) => {
          function removeTask() {
            props.removeTask(task.id, props.id);
          }
          function changeCheckbox() {
            props.changeCheckbox(task.id, props.id);
          }
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeCheckbox}
              />
              <span>{task.title}</span>
              <button onClick={removeTask}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllButtonClick}
          className={props.filter === "All" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveButtonClick}
          className={props.filter === "Active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedButtonClick}
          className={props.filter === "Completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
