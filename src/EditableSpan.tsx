import React, { ChangeEvent, useState } from "react";

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
        <input
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
