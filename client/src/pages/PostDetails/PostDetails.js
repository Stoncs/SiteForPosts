import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById } from '../../http/postAPI';
import { fetchUserById } from '../../http/userAPI';
import { fetchCommentsByPostId, postNewComment } from '../../http/messageAPI';
import styles from './postDetails.module.scss';
import { placeholdersComment } from '../../utils/strings/placeholdersComment';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup, unsetPopup } from '../../redux/actions/popup';
import Loader from '../../components/Loader/Loader';

const PostDetails = () => {
  // id поста
  const { id } = useParams();

  // Полученные данные с сервера
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  // Значения полей ввода
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Случайный плейсхолдер для поля ввода комментария
  const [placeholderComment, setPlacholderComment] = useState(
    'Оставьте свой комментарий...'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Отправить комментарий на сервер
    try {
      await postNewComment(id, name, email, comment).then((data) => {
        if (
          data.postId === id &&
          data.name === name &&
          data.email === email &&
          data.body === comment
        ) {
          dispatch(
            setPopup({
              type: 'normal',
              header: 'Успешно!',
              message: 'Вы оставили комментарий',
            })
          );
          // Сбросить значения полей после отправки комментария
          setComment('');
          setName('');
          setEmail('');
        } else {
          dispatch(
            setPopup({
              type: 'error',
              header: 'Ошибка!',
              message: 'Что-то пошло не так',
            })
          );
        }
      });
    } catch (error) {
      dispatch(
        setPopup({
          type: 'error',
          header: 'Ошибка!',
          message: 'Что-то пошло не так',
        })
      );
    }
  };

  useEffect(() => {
    fetchPostById(id).then((data) => setPost(data));
    const rand = Math.floor(Math.random() * placeholdersComment.length);
    setPlacholderComment(placeholdersComment[rand]);
  }, [id]);

  useEffect(() => {
    if (post) {
      fetchUserById(post.userId).then((data) => setUser(data));
      fetchCommentsByPostId(id).then((data) => setComments(data));
    }
  }, [post, id]);

  if (!post) {
    return <Loader />;
  }

  return (
    <>
      <button className={styles.back_button} onClick={() => navigate('/')}>
        &larr;
      </button>
      <div className={styles.post_details_container}>
        <div className={styles.post}>
          <h1 className={styles.post__title}>{post.title}</h1>
          <div className={styles.post__body}>{post.body}</div>
          {user && (
            <div className={styles.post__author}>
              <h2 className={styles.author__name}>Автор: {user.name}</h2>
              <p className={styles.author__email}>Почта: {user.email}</p>
              <p className={styles.author__company}>{user.company.name}</p>
            </div>
          )}
        </div>
        <h2 className={styles.comment_form__title}>Оставьте комментарий</h2>
        <form
          className={styles.comment_form}
          onSubmit={handleSubmit}
          method="POST"
        >
          <label className={styles.form_label} htmlFor="name">
            Имя:
          </label>
          <input
            className={styles.form_input}
            placeholder="Заголовок"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />

          <label className={styles.form_label} htmlFor="email">
            Почта:
          </label>
          <input
            className={styles.form_input}
            placeholder="Почта"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label className={styles.form_label} htmlFor="comment">
            Комментарий:
          </label>
          <textarea
            className={styles.form_textarea}
            placeholder={placeholderComment}
            id="comment"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            rows={4}
            required
          />
          <button className={styles.form_button} type="submit">
            Отправить комментарий
          </button>
        </form>
        <div className={styles.comments}>
          <h2 className={styles.comments__title}>Комментарии</h2>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p className={styles.comment__name}>{comment.name}</p>
              <p className={styles.comment__email}>{comment.email}</p>
              <p className={styles.comment__body}>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
