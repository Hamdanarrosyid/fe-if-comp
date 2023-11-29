import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Activity from './pages/Activity.jsx';
import { Protected, UnProtected } from './components/auth.jsx';
import AuthProvider from './context/auth/authProvider.jsx';
import Checkin from './pages/Checkin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><App /></Protected>
  },
  {
    path: "/checkin",
    element: <UnProtected><Checkin /></UnProtected>
  },
  {
    path: "/schedule/:id",
    element: <Activity />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
