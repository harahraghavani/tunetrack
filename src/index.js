import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MusicStateProvider } from './context/MusicContext';

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
  <ChakraProvider theme={theme} cssVarsRoot="#root">
    <MusicStateProvider>
      <App />
      <Toaster />
    </MusicStateProvider>
  </ChakraProvider>

);