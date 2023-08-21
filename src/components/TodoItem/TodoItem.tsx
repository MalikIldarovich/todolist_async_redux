import { FC, PropsWithChildren } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import { deleteTodo, toggleTodo } from "../../store/todoSlice";
import { ITodo } from "../../interfaces/todos";

// styles
import styles from "./styles.module.scss";

interface ITodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<PropsWithChildren<ITodoItemProps>> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const removeTask = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const toggleStatus = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <label className={styles["todo-item"]}>
      <input
        type="checkbox"
        className={styles["checkbox"]}
        checked={todo.completed}
        onChange={() => toggleStatus(todo.id)}
      />
      <span className={styles["todo-item-value"]}>{todo.title}</span>
      <button onClick={() => removeTask(todo.id)}>x</button>
    </label>
  );
};

export default TodoItem;
