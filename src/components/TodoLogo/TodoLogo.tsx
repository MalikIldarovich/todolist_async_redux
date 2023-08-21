import { FC } from "react";
// components
import Logo from "../../assets/images/logo.png";

// styles
import styles from "./styles.module.scss";
import clsx from "clsx";

interface ITodoLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const TodoLogo: FC<ITodoLogoProps> = ({
  width = 100,
  height = 100,
  className,
}) => {
  return (
    <div className={clsx(styles["todo-logo"], className || "")}>
      <img width={width} height={height} src={Logo} alt="Logo" />
    </div>
  );
};

export default TodoLogo;
