import { tasksReducer } from "./tasks-reducer";
import { TasksType, TodolistsType } from "../App";
import { AddTodolistAC, todolistReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: Array<TodolistsType> = [];

  const action = AddTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
