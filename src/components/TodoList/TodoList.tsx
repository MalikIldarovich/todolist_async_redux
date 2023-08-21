import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { ITodo } from "../../interfaces/todos";

// components
import TodoItem from "../TodoItem/TodoItem";

// styles
import styles from "./styles.module.scss";

const TodoList: FC<PropsWithChildren> = () => {
  const todos: ITodo[] = useAppSelector((state: any) => state.todos.todos);

  return (
    <ul className={styles["todo-list"]}>
      {todos.map((todo, index) => (
        <TodoItem key={todo.title + "-" + index} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
