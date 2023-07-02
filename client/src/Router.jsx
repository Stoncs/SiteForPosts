import { Route, Routes } from 'react-router';
import { MAIN_PAGE_ROUTE, POST_PAGE_ROUTE } from './utils/routePaths';
import PostList from './pages/PostList';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path={MAIN_PAGE_ROUTE} element={<PostList />} />
        <Route path={POST_PAGE_ROUTE} element={<p>POST</p>} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
      {/* {popupInfo.header ? <MessagePopup {...popupInfo} /> : ''}
      {menu.visible ? <Menu /> : ''} */}
    </>
  );
};
