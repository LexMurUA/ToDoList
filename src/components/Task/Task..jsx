import "./Task.css";
import pen from "../../images/pen.svg";
import trash from "../../images/trash.svg";
import { useState, useRef } from "react";
import { useTo_Do_ListContext } from "../../context/To_Do_ListContext";

export const Task = ({ id, taskText, status, date, time }) => {
  const { tasks, deleteTask, changeCheckBox, setTasks } =
    useTo_Do_ListContext();

  const [change, setChange] = useState(false);
  const [changedTask, setChangedTask] = useState(true);

  function beginTochangeTask() {
    setChange(true);
    setChangedTask(false);
  }

  function changeAlreadyExist(id) {
    if (changedValue.current.value.length === 0) return;
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              taskText: changedValue.current.value.trim(),
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
            }
          : task
      )
    );
    setChange(false);
    setChangedTask(true);
  }

  function onEnterDown(e) {
    e.key === "Enter" ? changeAlreadyExist(id) : e.key;
  }
  const changedValue = useRef(null);

  return (
    <div className={`task-view ${status ? "task-done" : "task-undone"}`}>
      <input
        className="lab"
        id={id}
        onChange={() => changeCheckBox(id)}
        checked={status}
        type="checkbox"
      />
      <label htmlFor={id}></label>
      <span>
        Дата та час: {date} {time}
      </span>
      {changedTask ? <p>{taskText}</p> : null}

      {change && (
        <>
          <input
            ref={changedValue}
            onKeyDown={onEnterDown}
            type="text"
            placeholder="Введіть змніу"
            defaultValue={taskText}
          />
          <button onClick={() => changeAlreadyExist(id)}>Змінити</button>
        </>
      )}
      <img onClick={beginTochangeTask} src={pen} alt="pen" />
      <img src={trash} onClick={() => deleteTask(id)} alt="trash" />
    </div>
  );
};
