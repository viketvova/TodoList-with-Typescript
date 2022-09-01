import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

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
  let [input, setInput] = useState("");
  let [error, setError] = useState<boolean>(false);
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.trim() !== "") {
      setError(false);
      setInput(e.currentTarget.value);
    } else {
      setError(true);
    }
  }
  function addTaskButton() {
    if (input.trim() !== "") {
      props.addTask(input.trim(), props.id);
      setInput("");
    } else {
      setError(true);
    }
  }
  function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTaskButton();
    }
  }
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

      <div>
        <input
          value={input}
          placeholder={props.placeholder}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTaskButton}>+</button>
        {error ? (
          <div className={"error-message"}>Title is required</div>
        ) : null}
      </div>
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
