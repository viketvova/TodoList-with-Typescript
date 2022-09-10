import React, { ChangeEvent, useState } from "react";
import { TextField } from "@material-ui/core";

type PropsType = {
  title: string;
  onTitleChange: (title: string) => void;
};

export function EditableSpan(props: PropsType) {
  let [value, setValue] = useState(props.title);
  let [editMode, seteditMode] = useState(false);

  function onClickHandler() {
    props.onTitleChange(value);
    seteditMode(!editMode);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }
  return (
    <>
      {editMode ? (
        <TextField
          variant="standard"
          onBlur={onClickHandler}
          value={value}
          onChange={onChangeHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onClickHandler} onChange={onChangeHandler}>
          {props.title}
        </span>
      )}
    </>
  );
}
