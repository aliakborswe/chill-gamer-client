import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AllRoutes from './routes/routes';
import AuthProviders from './providers/AuthProviders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from './providers/ThemeProvider';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <ThemeProvider>
    <AuthProviders>
      <AllRoutes />
      <ToastContainer position='top-right' />
    </AuthProviders>
  </ThemeProvider>
  </StrictMode>
);
