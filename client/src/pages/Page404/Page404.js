import React from 'react';
import styles from './page404.module.scss';
import { useNavigate } from 'react-router';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.error_page}>
      <h1 className={styles.error_code}>404</h1>
      <p className={styles.error_message}>Страница не найдена</p>
      <button className={styles.error_button} onClick={() => navigate('/')}>
        Вернуться на главную
      </button>
    </div>
  );
};

export default Page404;
