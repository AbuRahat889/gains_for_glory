// src/ReduxProvider.tsx
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store'; // Import the store you have created
import { PersistGate } from 'redux-persist/integration/react';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>
    <PersistGate persistor={persistor}>
      {children}
    </PersistGate>
    {/* {children} */}

  </Provider>;
};

export default ReduxProvider;
