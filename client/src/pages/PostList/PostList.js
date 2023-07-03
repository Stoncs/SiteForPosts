import React, { useState, useEffect, useRef } from 'react';
import { fetchAllPosts, fetchPostsByUserId } from '../../http/postAPI';
import { fetchAllUsers } from '../../http/userAPI';
import styles from './postList.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router';
import { POST_PAGE_ROUTE } from '../../utils/routePaths';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { setPopup } from '../../redux/actions/popup';

const PostList = () => {
  // Полученные данные о постах и пользователях
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);
  // Фильтрация по пользователю
  const [selectedUser, setSelectedUser] = useState('');
  // Переменная для анимации списка постов
  const [isListVisible, setIsListVisible] = useState(true);
  const [isPaginationVisible, setIsPaginationVisible] = useState(true);
  const postsBlockRef = useRef(null);
  const paginationBlock1 = useRef(null);
  const paginationBlock2 = useRef(null);

  // Для пагинации
  const [visiblePages, setVisiblePages] = useState([]);
  // Номер текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  // Количество постов на одной странице
  const [postsPerPage, setPostsPerPage] = useState(10);
  // Количество видимых страниц
  const TOTAL_VISIBLE_PAGES = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функция, возвращающая массив страниц для пагинации
  const generateVisiblePages = () => {
    if (totalPages <= TOTAL_VISIBLE_PAGES) {
      const visiblePages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
      setVisiblePages(visiblePages);
    } else {
      // Количество соседних страниц от текущей
      const totalNeighbours = Math.floor(TOTAL_VISIBLE_PAGES / 2);

      let startPage = currentPage - totalNeighbours;
      let endPage = currentPage + totalNeighbours;

      if (startPage <= 0) {
        endPage += Math.abs(startPage) + 1;
        startPage = 1;
      }

      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }

      const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );
      setVisiblePages(visiblePages);
    }
  };

  useEffect(() => {
    generateVisiblePages();

    try {
      fetchAllUsers().then((users) => setUsers(users));

      fetchAllPosts(currentPage, postsPerPage).then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    generateVisiblePages();
    // При изменении выбранного пользователя, загружаем посты для выбранного пользователя
    try {
      if (selectedUser) {
        fetchPostsByUserId(selectedUser, currentPage, postsPerPage).then(
          (data) => {
            setPosts(data.posts);
            setTotalPages(data.totalPages);
          }
        );
      } else {
        fetchAllPosts(currentPage, postsPerPage).then((data) => {
          setPosts(data.posts);
          setTotalPages(data.totalPages);
        });
      }
    } catch (error) {
      dispatch(
        setPopup({
          type: 'error',
          header: 'Ошибка!',
          message: 'Что-то пошло не так',
        })
      );
    }

    const timer = setTimeout(() => {
      setIsListVisible(true);
      setIsPaginationVisible(true);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [selectedUser, currentPage, postsPerPage, totalPages]);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    setIsListVisible(false);
    setIsPaginationVisible(false);
    setSelectedUser(selectedUserId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsListVisible(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
    setIsListVisible(false);
  };

  const handleNextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    setIsListVisible(false);
  };

  const onClickPost = (postId) => {
    navigate(POST_PAGE_ROUTE.slice(0, -3) + postId);
  };

  if (!posts || !users) {
    return <Loader />;
  }

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
      {/* Анимация для появления и исчезновения постов */}
      <CSSTransition
        in={isListVisible}
        nodeRef={postsBlockRef}
        timeout={500}
        classNames={{
          enter: styles.posts__enter,
          enterActive: styles.posts__enter_active,
          exitActive: styles.posts__exit_active,
          exit: styles.posts__exit,
        }}
      >
        <div className={styles.posts} ref={postsBlockRef}>
          {posts.map((post) => (
            <div
              className={styles.post}
              key={post.id}
              onClick={() => onClickPost(post.id)}
            >
              <h2 className={styles.post__title}>{post.title}</h2>
              <p className={styles.post__body}>{post.body}</p>
              <p className={styles.post__author}>
                Автор: {users.find((user) => user.id === post.userId).name}
              </p>
            </div>
          ))}
        </div>
      </CSSTransition>
      {/* Если страница одна, то пагинация не нужна */}
      {totalPages > 1 &&
        (totalPages <= TOTAL_VISIBLE_PAGES ? (
          <CSSTransition
            in={isPaginationVisible}
            nodeRef={paginationBlock1}
            timeout={500}
            onMountOnExit
            classNames={{
              enter: styles.pagination__enter,
              enterActive: styles.pagination__enter_active,
              exitActive: styles.pagination__exit_active,
              exit: styles.pagination__exit,
            }}
          >
            <div className={styles.pagination} ref={paginationBlock1}>
              {visiblePages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles.pagination__button} ${
                    currentPage === pageNumber ? styles.active : ''
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition
            in={isPaginationVisible}
            nodeRef={paginationBlock2}
            timeout={500}
            onMountOnExit
            classNames={{
              enter: styles.pagination__enter,
              enterActive: styles.pagination__enter_active,
              exitActive: styles.pagination__exit_active,
              exit: styles.pagination__exit,
            }}
          >
            <div className={styles.pagination} ref={paginationBlock2}>
              <button
                className={styles.pagination__button}
                disabled={currentPage === 1}
                onClick={() => handlePrevPage()}
              >
                &#8592;
              </button>
              {currentPage - 2 > 1 && (
                <button
                  className={styles.pagination__button}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>
              )}

              {currentPage > 3 && totalPages > 5 && (
                <span className={styles.pagination__ellipsis}>...</span>
              )}

              {visiblePages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles.pagination__button} ${
                    currentPage === pageNumber ? styles.active : ''
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              ))}

              {currentPage < totalPages - 2 && totalPages > 5 && (
                <span className={styles.pagination__ellipsis}>...</span>
              )}

              {currentPage < totalPages - 2 && (
                <button
                  className={styles.pagination__button}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </button>
              )}
              <button
                className={styles.pagination__button}
                disabled={currentPage === totalPages}
                onClick={() => handleNextPage()}
              >
                &rarr;
              </button>
            </div>
          </CSSTransition>
        ))}
    </div>
  );
};

export default PostList;
