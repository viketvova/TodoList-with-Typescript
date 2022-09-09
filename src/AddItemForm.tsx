import React, { ChangeEvent, KeyboardEvent, useState } from "react";

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
