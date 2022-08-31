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

  let newTasks = tasks;
  if (filter === "Active") {
    newTasks = tasks.filter((el) => !el.isDone);
  }
  if (filter === "Completed") {
    newTasks = tasks.filter((el) => el.isDone);
  }

  return (
    <div className="App">
      <Todolist
        title="New"
        placeholder="Write text"
        tasks={newTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}
export default App;
