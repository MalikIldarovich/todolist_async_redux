import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface ITodoTitleProps {
  title: string;
  accent?: string;
  size: "xl" | "lg" | "md" | "sm";
  align: "left" | "center" | "right";
  color?: "dark" | "light" | "primary" | "secondary" | "success" | "error";
  weight?: "bold" | "semibold" | "medium" | "normal";
  accentColor?: "dark" | "light" | "primary" | "secondary";
  className?: string;
}

const TodoTitle: FC<PropsWithChildren<ITodoTitleProps>> = ({
  title,
  accent,
  size,
  align,
  color,
  weight = "bold",
  accentColor,
  className,
}) => {
  return (
    <div
      className={clsx(
        styles["todo-title"],
        styles[size],
        styles[align],
        styles[weight],
        className || ""
      )}
    >
      {accent && (
        <span className={accentColor && styles[accentColor]}>{accent}</span>
      )}{" "}
      <span className={color && styles[color]}>{title}</span>
    </div>
  );
};

export default TodoTitle;
