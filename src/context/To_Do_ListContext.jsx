import { createContext, useContext } from "react";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const To_Do_ListContext = createContext(null);

export const To_Do_ListContextProvider = ({ children }) => {
  const [buttonShow, setButtonShow] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const toDoList = localStorage.getItem("tasks");
    return toDoList ? JSON.parse(toDoList) : [];
  });

  useEffect(
    () => localStorage.setItem("tasks", JSON.stringify(tasks)),
    [tasks]
  );

  const taskValueRef = useRef(null);

  const buttonShowF = () => {
    taskValueRef.current.value.length === 0
      ? setButtonShow(false)
      : setButtonShow(true);
  };

  // ====================AFTER HOOKS===============================

  const addTask = () => {
    if (taskValueRef.current.value.length === 0) return;
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        taskText: taskValueRef.current.value.trim(),
        status: false,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    ]);
    taskValueRef.current.value = "";
    setButtonShow(false);
  };
  const onEnterDown = (e) => {
    e.key === "Enter" ? addTask() : e.key;
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const changeCheckBox = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };
  return (
    <To_Do_ListContext.Provider
      value={{
        tasks,
        setTasks,
        buttonShow,
        setButtonShow,
        taskValueRef,
        buttonShowF,
        addTask,
        onEnterDown,
        deleteTask,
        changeCheckBox,
      }}
    >
      {children}
    </To_Do_ListContext.Provider>
  );
};

export const useTo_Do_ListContext = () => {
  const context = useContext(To_Do_ListContext);
  if (context === null) {
    throw new Error(
      "useTo_Do_ListContext must be within To_Do_ListContextProvider"
    );
  }
  return context;
};
