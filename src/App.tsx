import { ChangeEvent, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/useStore";
import { addTodo, getTodos } from "./store/todoSlice";

// components
import TodoTitle from "./components/TodoTitle/TodoTitle";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";

// styles
import "./assets/css/global.scss";
import TodoButton from "./components/TodoButton/TodoButton";
import TodoLogo from "./components/TodoLogo/TodoLogo";

function App() {
  const [title, setTitle] = useState("");
  const { todos, loading, error } = useAppSelector((state: any) => state.todos);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const addTask = () => {
    if (title.trim().length) {
      dispatch(addTodo(title));
      setTitle("");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="App">
      <div className="logo-double-container">
        <TodoLogo className="logo-double" />
      </div>
      <div className="todo-header">
        <TodoLogo />
        <TodoTitle
          title="React (Redux Lessons)"
          accent="To Do List"
          size="xl"
          align="center"
          color="light"
          accentColor="primary"
        />
        <div className="todo-form">
          <TodoInput
            value={title}
            placeholder="Введите название дела"
            onChange={onChange}
            onSubmit={addTask}
          />
          <TodoButton text="Добавить" color="primary" onClick={addTask} />
        </div>
      </div>
      {error && (
        <TodoTitle
          title={error}
          size="xl"
          color="error"
          align="center"
          className="my-6"
        />
      )}
      {loading && (
        <TodoTitle
          title="Loading..."
          size="xl"
          color="success"
          align="center"
          className="my-6"
        />
      )}
      {todos.length > 0 && <TodoList />}
    </div>
  );
}

export default App;
