import { Router } from './Router.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './generalScss/normalize.scss';
import store from './redux/store.js';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
