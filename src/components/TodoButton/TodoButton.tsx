import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface ITodoButtonProps {
  text: string;
  color: "primary" | "secondary";
  full?: boolean;
  className?: string;
  onClick: () => void;
}

const TodoButton: FC<PropsWithChildren<ITodoButtonProps>> = ({
  text,
  color,
  full = false,
  className,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        styles["button"],
        styles[color],
        styles[full ? "full" : ""],
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TodoButton;
