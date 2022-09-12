import React from "react";
import {
  AddTodolistAC,
  ChangeTodolistAC,
  ChangeTodolistFilterAC,
  RemoveTodolistAC,
  todolistReducer,
} from "./todolists-reducer";
import { FilterValueType, TodolistsType } from "../App";
import { v1 } from "uuid";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];
  const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("Add todolist", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTitle: string = "Tell me why?";

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];
  const endState = todolistReducer(startState, AddTodolistAC(newTitle));
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
  expect(endState[0].filter).toBe("All");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const action = ChangeTodolistAC(todolistId2, newTodolistTitle);

  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "Completed";

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ];

  const action = ChangeTodolistFilterAC(todolistId2, newFilter);

  const endState = todolistReducer(startState, action);

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
