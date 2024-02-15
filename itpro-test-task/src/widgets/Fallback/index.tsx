import { Button } from "antd";
import s from "./styles.module.scss";

export const Fallback = () => {
  const handleClick = () => {
    location.reload();
  };
  return (
    <div className={s.wrapper}>
      <div className={s.message}>
        <p className={s.text}>
          Кажется что-то пошло не так. Попробуйте обновить страницу и задать
          другие параметры.
        </p>
        <Button onClick={handleClick}>Обновить страницу</Button>
      </div>
    </div>
  );
};
