import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';
import '@/styles/globals.css';
import Head from 'next/head';
import theme from '@/theme';
import store from '@/redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>Khoa nè</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="/logo.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
