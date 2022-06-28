import React from "react";
import styles from "./not-found-block.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>Данная страница отсутствует</p>
    </div>
  );
};