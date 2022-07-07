import React, { useState, useEffect } from "react";
import "./App.css";

// Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run ONCE when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  //Use effect
  useEffect(() => {
    filterHandler();
    console.log("here line 21:", todos);
    saveLocalTodos();
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //Save to local
  const saveLocalTodos = () => {
    console.log("save to local");
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      console.log("local empty");
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      console.log("retrieve from local");
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      console.log("before todo:", todos);
      console.log("todoLocal:", todoLocal);
      setTodos(todoLocal);
      console.log("after todo:", todos);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Ed's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
