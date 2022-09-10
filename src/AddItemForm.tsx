import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { AddBox } from "@material-ui/icons";



type PropsType = {
  addItem: (title: string) => void;
  placeholder: string;
};

export function AddItemForm(props: PropsType) {
  let [input, setInput] = useState("");
  let [error, setError] = useState<boolean>(false);
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.trim() !== "") {
      setError(false);
      setInput(e.currentTarget.value);
    } else {
      setError(true);
      setInput("");
    }
  }
  function addTaskButton() {
    if (input.trim() !== "") {
      props.addItem(input.trim());
      setInput("");
      setError(false);
    } else {
      setError(true);
    }
  }
  function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTaskButton();
    }
  }

  return (
    <>
      <TextField
        id="standard-basic" variant="standard"
        value={input}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        label={props.placeholder}
        helperText={error}
      />
      <IconButton
        color='primary'
        onClick={addTaskButton}>
        <AddBox />
      </IconButton>
      {error ? <div className={"error-message"}>Title is required</div> : null}
    </>
  );
}
