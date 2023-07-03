import { Route, Routes } from 'react-router';
import { MAIN_PAGE_ROUTE, POST_PAGE_ROUTE } from './utils/routePaths';
import PostList from './pages/PostList/PostList';
import PostDetails from './pages/PostDetails/PostDetails';
import Page404 from './pages/Page404/Page404';
import { useSelector } from 'react-redux';
import MessagePopup from './components/MessagePopup/Popup.component';

export const Router = () => {
  const popup = useSelector((state) => state.popup);
  return (
    <>
      <Routes>
        <Route path={MAIN_PAGE_ROUTE} element={<PostList />} />
        <Route path={POST_PAGE_ROUTE} element={<PostDetails />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      {popup.header ? <MessagePopup {...popup} /> : ''}
    </>
  );
};
