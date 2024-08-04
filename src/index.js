import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MusicStateProvider } from './context/MusicContext';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/Spinner';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        padding: 0,
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <ChakraProvider theme={theme} cssVarsRoot="#root">
        <MusicStateProvider>
          <App />
          <Toaster />
        </MusicStateProvider>

      </ChakraProvider>
    </PersistGate>
  </Provider >

);