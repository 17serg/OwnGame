import React from 'react';
import RouterProvider from './router/RouterProvider';
import { Provider } from 'react-redux';
import { store } from './store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  );
}

export default App;
