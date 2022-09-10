import React from "react";
import { FilterValueType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import createTheme  from '@material-ui/core/styles/createTheme';
import { ThemeProvider } from "@material-ui/styles";
import  Checkbox from "@material-ui/core/Checkbox/Checkbox";



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
  onTaskTitleChange: (
    todolistId: string,
    taskId: string,
    title: string
  ) => void;
  onTodolistTitleChange: (todolistId: string, title: string) => void;
};
const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: "#19857b",
    },
  },
});

export function Todolist(props: PropsType) {
  function onTodolistTitleChange(title: string) {
    props.onTodolistTitleChange(props.id, title);
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
  function AddTask(title: string) {
    props.addTask(title, props.id);
  }
  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onTitleChange={onTodolistTitleChange}
        />
        <IconButton aria-label="delete" onClick={deleteTodolist}>
         <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={AddTask} placeholder={props.placeholder} />

      <ul>
        {props.tasks.map((task) => {
          function removeTask() {
            props.removeTask(task.id, props.id);
          }
          function changeCheckbox() {
            props.changeCheckbox(task.id, props.id);
          }
          function onTitleChange(title: string) {
            props.onTaskTitleChange(props.id, task.id, title);
          }
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox
                size='small'
                color="primary"
                checked={task.isDone}
                onChange={changeCheckbox}
              />
              <EditableSpan title={task.title} onTitleChange={onTitleChange} />
              <IconButton aria-label="delete" size="small" onClick={removeTask}>
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button variant="contained" size="small"
          onClick={onAllButtonClick}
          color={props.filter === "All" ? "secondary" : "default"}
        >
          All
        </Button>
        <ThemeProvider theme={theme}>
        <Button variant="contained" size="small"
          onClick={onActiveButtonClick}
          color={props.filter === "Active" ? "secondary" : "default"}
        >
          Active
        </Button>
        <Button variant="contained" size="small"
          onClick={onCompletedButtonClick}
          color={props.filter === "Completed" ? "secondary" : "default"}
        >
          Completed
        </Button>
          </ThemeProvider>
      </div>
    </div>
  );
}
