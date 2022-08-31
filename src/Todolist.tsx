import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType } from "./App";

type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  title: string;
  placeholder: string;
  tasks: Array<TasksType>;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterValueType) => void;
  addTask: (title: string) => void;
};

export function Todolist(props: PropsType) {
  let [input, setInput] = useState("");
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.currentTarget.value);
  }
  function addTaskButton() {
    setInput("");
    props.addTask(input.trim());
  }
  function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTaskButton();
    }
  }
  function onAllButtonClick() {
    props.changeFilter("All");
  }
  function onActiveButtonClick() {
    props.changeFilter("Active");
  }
  function onCompletedButtonClick() {
    props.changeFilter("Completed");
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={input}
          placeholder={props.placeholder}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskButton}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllButtonClick}>All</button>
        <button onClick={onActiveButtonClick}>Active</button>
        <button onClick={onCompletedButtonClick}>Completed</button>
      </div>
    </div>
  );
}
