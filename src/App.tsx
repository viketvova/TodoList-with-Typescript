import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValueType = "All" | "Active" | "Completed";

function App() {
  let [filter, setFilter] = useState<FilterValueType>("All");
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  function addTask(title: string) {
    if (title !== "") {
      let newTask = { id: v1(), title: title, isDone: false };
      setTasks([newTask, ...tasks]);
    }
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((el) => el.id !== id));
  }

  function changeFilter(filter: "All" | "Active" | "Completed") {
    setFilter(filter);
  }

  function changeCheckbox(id: any) {
    let newTasks = tasks;
    newTasks.map((el) => (el.id === id ? (el.isDone = !el.isDone) : el.isDone));
    setTasks([...newTasks]);
  }

  let todolistTasks = tasks;
  if (filter === "Active") {
    todolistTasks = tasks.filter((el) => !el.isDone);
  }
  if (filter === "Completed") {
    todolistTasks = tasks.filter((el) => el.isDone);
  }

  return (
    <div className="App">
      <Todolist
        title="New"
        placeholder="Write text"
        tasks={todolistTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeCheckbox={changeCheckbox}
      />
    </div>
  );
}
export default App;
