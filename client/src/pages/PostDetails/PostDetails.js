import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../http/postAPI';
import { fetchUserById } from '../../http/userAPI';
import { fetchCommentsByPostId, postNewComment } from '../../http/messageAPI';
import styles from './postDetails.module.scss';
import { placeholdersComment } from '../../utils/strings/placeholdersComment';

const PostDetails = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Случайный плейсхолдер для поля ввода комментария
  const [placeholderComment, setPlacholderComment] = useState(
    'Оставьте свой комментарий...'
  );

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

    // Отправить данные комментария на сервер
    try {
      await postNewComment(id, name, email, comment).then((data) => {
        if (
          data.postId === id &&
          data.name === name &&
          data.email === email &&
          data.body === comment
        ) {
          alert('Успешно');
        }
      });
    } catch (error) {
      console.log(error.message);
    }

    // Сбросить значения полей после отправки комментария
    setComment('');
    setName('');
    setEmail('');
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
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.post_details_container}>
      <div className={styles.post}>
        <h1 className={styles.post__title}>{post.title}</h1>
        <div className={styles.post__body}>{post.body}</div>
        {user && (
          <div className={styles.post__author}>
            <h2 className={styles.author_name}>Автор: {user.name}</h2>
            <p className={styles.author_email}>Почта: {user.email}</p>
            <p className={styles.author_company}>{user.company.name}</p>
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
          placeholder="Имя"
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
  );
};

export default PostDetails;
