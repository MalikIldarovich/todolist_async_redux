import {
  KeyboardEventHandler,
  ChangeEvent,
  FC,
  PropsWithChildren,
} from "react";
import styles from "./styles.module.scss";

interface IInputFieldProps {
  value: string;
  label?: string;
  type?: "text" | "email" | "phone" | "submit" | "file";
  placeholder?: string;
  onSubmit?: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TodoInput: FC<PropsWithChildren<IInputFieldProps>> = ({
  value,
  label,
  type = "text",
  placeholder = "",
  onChange,
  onSubmit,
}) => {
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && onSubmit) onSubmit();
  };

  return (
    <div className={styles["todo-input"]}>
      <label className={styles["todo-input-label"]}>
        {label && label}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </div>
  );
};

export default TodoInput;
