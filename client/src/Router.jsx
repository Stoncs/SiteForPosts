import { Route, Routes } from 'react-router';
import { MAIN_PAGE_ROUTE, POST_PAGE_ROUTE } from './utils/routePaths';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path={MAIN_PAGE_ROUTE} element={<p>POSTS</p>} />
        <Route path={POST_PAGE_ROUTE} element={<p>POST</p>} />
      </Routes>
      {/* {popupInfo.header ? <MessagePopup {...popupInfo} /> : ''}
      {menu.visible ? <Menu /> : ''} */}
    </>
  );
};
