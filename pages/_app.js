import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    // <StateContext>
    // </StateContext>
    <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>

      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
</PersistGate>

    </Provider>

  )
}

export default MyApp
