import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type PropsType = {
  addTask: (title: string, id: string) => void;
  id: string;
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
    }
  }
  function addTaskButton() {
    if (input.trim() !== "") {
      props.addTask(input.trim(), props.id);
      setInput("");
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
      <input
        value={input}
        placeholder={props.placeholder}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTaskButton}>+</button>
      {error ? <div className={"error-message"}>Title is required</div> : null}
    </>
  );
}
