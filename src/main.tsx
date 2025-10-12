import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import '@acrool/react-carousel/dist/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CssBaseline/>
        <App/> 
    </Provider>
  </StrictMode>,
)
