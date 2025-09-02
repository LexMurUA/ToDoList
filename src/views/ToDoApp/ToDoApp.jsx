import { Task } from "../../components/Task/Task.";
import { useTo_Do_ListContext } from "../../context/To_Do_ListContext";
import "./ToDoApp.css";
import React from "react";

export const ToDoApp = () => {
  const { tasks, addTask, buttonShowF, buttonShow, taskValueRef, onEnterDown } =
    useTo_Do_ListContext();

  return (
    <div className="to-do-app">
      <h1>Створіть завдання</h1>
      <h2>
        Дата та час: {new Date().toLocaleDateString()}{" "}
        {new Date().toLocaleTimeString()}
      </h2>
      <input
        onChange={buttonShowF}
        ref={taskValueRef}
        type="text"
        placeholder="Ваше завдання..."
        onKeyDown={onEnterDown}
      />
      {buttonShow && <button onClick={addTask}>Додати завдання</button>}

      <div className="list">
        <p>
          Кількість незавершених завдань:{" "}
          {tasks.filter((task) => !task.status).length}
        </p>
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};
