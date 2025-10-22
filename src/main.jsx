import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import ReduxWrapper from './pages/provider/ReduxWrapper.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxWrapper>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </ReduxWrapper>
  </StrictMode>,
)
