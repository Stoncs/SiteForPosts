import { Router } from './Router.jsx';
import { BrowserRouter } from 'react-router-dom';

import './generalScss/normalize.module.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
