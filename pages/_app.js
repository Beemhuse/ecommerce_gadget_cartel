import React from "react";
import { Toaster } from "react-hot-toast";
import { GoogleTagManager } from "@next/third-parties/google";
import { Layout } from "../components";
import "../styles/globals.css";
// import { StateContext } from '../context/StateContext';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GeneralLayout from "../components/layout/GeneralLayout";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GeneralLayout>
          <Toaster />
          <GoogleTagManager gtmId="G-PW2FL58540"/>
          <Component {...pageProps} />
        </GeneralLayout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
