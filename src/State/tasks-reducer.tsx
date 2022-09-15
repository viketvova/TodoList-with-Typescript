import { TasksType } from "../App";
import { v1 } from "uuid";

type ChangeTaskTitleType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};
type AddTaskType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};
type RemoveTaskType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
export const RemoveTaskTypeAC = (
  todolistId: string,
  taskId: string
): RemoveTaskType => {
  return { type: "REMOVE-TASK", todolistId, taskId };
};
export const AddTaskTypeAC = (
  todolistId: string,
  title: string
): AddTaskType => {
  return { type: "ADD-TASK", todolistId, title };
};
export const ChangeTaskTitleTypeAC = (
  todolistId: string,
  taskId: string,
  title: string
): ChangeTaskTitleType => {
  return { type: "CHANGE-TASK-TITLE", todolistId, taskId, title };
};

type ActionType = ChangeTaskTitleType | AddTaskType | RemoveTaskType;
export const tasksReducer = (
  state: TasksType,
  action: ActionType
): TasksType => {
  switch (action.type) {
    case "CHANGE-TASK-TITLE":
      // Alternative solution
      // let newTasks = state;
      // newTasks[action.todolistId].map((el) =>
      //   el.id === action.taskId ? (el.title = action.title) : el.title
      // );
      // return { ...newTasks };
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].map((task) =>
            task.id === action.taskId ? { ...task, title: action.title } : task
          ),
        ],
      };
    case "ADD-TASK":
      // Alternative solution
      // let newTask = { id: v1(), title: action.title, isDone: false };
      // let todolistTasks = state[action.todolistId];
      // state[action.todolistId] = [newTask, ...todolistTasks];
      // return { ...state };
      let newTask = { id: v1(), title: action.title, isDone: false };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    case "REMOVE-TASK":
      // Alternative solution
      // let newTasks = state[action.todolistId].filter(
      //   (el) => el.id !== action.taskId
      // );
      // state[action.todolistId] = newTasks;
      // return { ...state };
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].filter((el) => el.id !== action.taskId),
        ],
      };
    default:
      throw new Error("I do not know this function");
  }
};
