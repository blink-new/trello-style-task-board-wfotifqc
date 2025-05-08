import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Board } from './pages/Board';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/board/:id',
    element: <Board />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;