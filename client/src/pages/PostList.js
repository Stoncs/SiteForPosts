import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchAllPosts, fetchPostsByUserId } from '../http/postAPI';
import { fetchAllUsers } from '../http/userAPI';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

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
  }, [selectedUser]);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
  };

  return (
    <div>
      <h1>Список постов</h1>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">Все пользователи</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
