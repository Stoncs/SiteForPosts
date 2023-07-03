import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router';

import { unsetPopup } from '../../redux/actions/popup';

import styles from './popup.module.scss';
import { useDispatch } from 'react-redux';

export default function MessagePopup({ header, message, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div
        className={classNames(styles.container, {
          [styles.container__normal]: type === 'normal',
          [styles.container__error]: type === 'error',
        })}
      >
        <div className={styles.x} onClick={() => dispatch(unsetPopup())}>
          x
        </div>
        <div className={styles.content}>
          <h2>{header}</h2>
          <p>{message}</p>
        </div>
      </div>
      <div className={styles.backdrop} onClick={() => dispatch(unsetPopup())} />
    </>
  );
}
