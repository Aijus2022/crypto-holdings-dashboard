import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store/store'; // Import the Redux store
import App from './App'; // Import the App component
import './index.css'; // Import global styles

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the app in Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
