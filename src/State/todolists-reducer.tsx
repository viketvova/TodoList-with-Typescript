import { TodolistsType, FilterValueType } from "../App";
import { v1 } from "uuid";

type RemoveTodolistType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
type AddTodolistType = {
  type: "ADD-TODOLIST";
  title: string;
};
type ChangeTodolistTitleType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
type ChangeTodolistFilterType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValueType;
};
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const AddTodolistAC = (title: string): AddTodolistType => {
  return { type: "ADD-TODOLIST", title };
};
export const ChangeTodolistAC = (
  id: string,
  title: string
): ChangeTodolistTitleType => {
  return { type: "CHANGE-TODOLIST-TITLE", id, title };
};
export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterValueType
): ChangeTodolistFilterType => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter };
};

type ActionType =
  | RemoveTodolistType
  | AddTodolistType
  | ChangeTodolistTitleType
  | ChangeTodolistFilterType;
export const todolistReducer = (
  state: Array<TodolistsType>,
  action: ActionType
): Array<TodolistsType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return [...state.filter((el) => el.id !== action.id)];
    case "ADD-TODOLIST":
      // Alternative solution
      // let newTodolistId = v1();
      // let newTodolist: TodolistsType = {
      //   id: newTodolistId,
      //   title: action.title,
      //   filter: "All",
      // };
      // return [newTodolist, ...state];
      return [{ id: v1(), title: action.title, filter: "All" }, ...state];
    case "CHANGE-TODOLIST-TITLE":
      // let newState = [...state];
      // newState.map((el) =>
      //   el.id === action.id ? (el.title = action.title) : el.title
      // );
      // return [...newState];
      return [
        ...state.map((el) =>
          el.id === action.id ? { ...el, title: action.title } : el
        ),
      ];
    case "CHANGE-TODOLIST-FILTER":
      // let newState = [...state];
      // newState.map((el) =>
      //   el.id === action.id ? (el.filter = action.filter) : el.filter
      // );
      // return [...newState];
      return [
        ...state.map((el) =>
          el.id === action.id ? { ...el, filter: action.filter } : el
        ),
      ];
    default:
      throw new Error("I don't understand this type");
  }
};
