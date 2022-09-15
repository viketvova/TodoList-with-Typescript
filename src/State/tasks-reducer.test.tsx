import { TasksType } from "../App";
import { v1 } from "uuid";
import {
  AddTaskTypeAC,
  ChangeTaskTitleTypeAC,
  RemoveTaskTypeAC,
  tasksReducer,
} from "./tasks-reducer";
import { RemoveTodolistAC } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TasksType;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = {
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
  };
});

test("Task title should change correctly", () => {
  let taskChangeId: string = startState[todolistId2][0].id;

  let newTitle = "PHP";

  let endState: TasksType = tasksReducer(
    startState,
    ChangeTaskTitleTypeAC(todolistId2, taskChangeId, newTitle)
  );
  expect(endState[todolistId2][0].title).toBe(newTitle);
});

test("Add task to correct todolist", () => {
  let newTaskTitle = "Ok";

  let endState = tasksReducer(
    startState,
    AddTaskTypeAC(todolistId1, newTaskTitle)
  );
  expect(endState[todolistId1].length).toBe(6);
  expect(endState[todolistId1][0].title).toBe(newTaskTitle);
});

test("Remove correct task from correct todolist", () => {
  let taskId = startState[todolistId1][0].id;

  let endState: TasksType = tasksReducer(
    startState,
    RemoveTaskTypeAC(todolistId1, taskId)
  );
  expect(endState[todolistId1].length).toBe(4);
  expect(endState[todolistId1][0].title).toBe("JS");
});

test("property with todolistId should be deleted", () => {
  const action = RemoveTodolistAC(todolistId2);

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
