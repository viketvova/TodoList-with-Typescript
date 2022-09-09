import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValueType = "All" | "Active" | "Completed";
export type TasksType = {
  [id: string]: Array<TaskType>;
};
type TodolistsType = { id: string; title: string; filter: FilterValueType };

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "Active" },
  ]);
  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "NodeJS", isDone: false },
      { id: v1(), title: "TypeJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Soap", isDone: true },
      { id: v1(), title: "Water", isDone: false },
      { id: v1(), title: "Milk", isDone: false },
    ],
  });

  function onTodolistTitleChange(todolistId: string, title: string) {
    let newTodolist = todolists;
    newTodolist.map((el) =>
      el.id === todolistId ? (el.title = title) : el.title
    );
    setTodolists([...newTodolist]);
  }

  function onTaskTitleChange(
    todolistId: string,
    taskId: string,
    newTitle: string
  ) {
    let newTasks = tasks;
    console.log(todolistId, taskId, newTitle);
    newTasks[todolistId].map((el) =>
      el.id === taskId ? (el.title = newTitle) : el.title
    );
    setTasks({ ...newTasks });
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistsType = {
      id: newTodolistId,
      title: title,
      filter: "All",
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({ [newTodolistId]: [], ...tasks });
  }
  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [newTask, ...todolistTasks];
    setTasks({ ...tasks });
  }

  function removeTask(id: string, todolistId: string) {
    let newTodolistTasks = tasks[todolistId].filter((el) => el.id !== id);
    tasks[todolistId] = newTodolistTasks;
    setTasks({ ...tasks });
  }

  function changeFilter(filter: FilterValueType, id: string) {
    todolists.map((el) => {
      return el.id === id ? (el.filter = filter) : el.filter;
    });
    setTodolists([...todolists]);
  }

  function changeCheckbox(id: any, todolistId: string) {
    let newTasks = tasks;
    newTasks[todolistId].map((el) =>
      el.id === id ? (el.isDone = !el.isDone) : el.isDone
    );
    setTasks({ ...newTasks });
  }

  function deleteTodolist(todolistId: string) {
    setTodolists(todolists.filter((el) => el.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  }

  return (
    <div className="App">
      <div>
        <AddItemForm
          addItem={addTodolist}
          placeholder={"Write Todolist name"}
        />
      </div>
      {todolists.map((el) => {
        let todolistTasks = tasks[el.id];
        let tasksForTodolist = todolistTasks;
        if (el.filter === "Active") {
          tasksForTodolist = todolistTasks.filter((el) => !el.isDone);
        }
        if (el.filter === "Completed") {
          tasksForTodolist = todolistTasks.filter((el) => el.isDone);
        }
        return (
          <Todolist
            key={el.id}
            id={el.id}
            title={el.title}
            placeholder="Write task name"
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeCheckbox={changeCheckbox}
            filter={el.filter}
            deleteTodolist={deleteTodolist}
            onTaskTitleChange={onTaskTitleChange}
            onTodolistTitleChange={onTodolistTitleChange}
          />
        );
      })}
    </div>
  );
}
export default App;
