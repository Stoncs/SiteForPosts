import React, { useState, useEffect, useRef } from 'react';
import { fetchAllPosts, fetchPostsByUserId } from '../http/postAPI';
import { fetchAllUsers } from '../http/userAPI';
import styles from './postList.module.scss';
import { CSSTransition } from 'react-transition-group';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isListVisible, setIsListVisible] = useState(true);
  const nodeRef = useRef(null);

  useEffect(() => {
    fetchAllUsers().then((users) => setUsers(users));

    fetchAllPosts().then((posts) => setPosts(posts));
  }, []);

  useEffect(() => {
    // При изменении выбранного пользователя, загружаем посты для выбранного пользователя
    if (selectedUser) {
      fetchPostsByUserId(selectedUser).then((posts) => setPosts(posts));
    } else {
      fetchAllPosts().then((posts) => setPosts(posts));
    }
    const timer = setTimeout(() => setIsListVisible(true), 300);
    return () => clearTimeout(timer);
  }, [selectedUser]);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setIsListVisible(false);
    setSelectedUser(selectedUserId);
  };

  return (
    <div className={styles.post_list_container}>
      <h1 className={styles.h1}>Список постов</h1>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">Все пользователи</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <CSSTransition
        in={isListVisible}
        nodeRef={nodeRef}
        timeout={500}
        classNames={{
          enter: styles.posts__enter,
          enterActive: styles.posts__enter_active,
          exitActive: styles.posts__exit_active,
          exit: styles.posts__exit,
        }}
      >
        <div className={styles.posts} ref={nodeRef}>
          {posts.map((post) => (
            <div className={styles.post} key={post.id}>
              <h2 className={styles.post__title}>{post.title}</h2>
              <p className={styles.post__body}>{post.body}</p>
              <p className={styles.post__author}>
                Автор: {users.find((user) => user.id === post.userId).name}
              </p>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default PostList;
