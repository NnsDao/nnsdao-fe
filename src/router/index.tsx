import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import DaoDetail from '../pages/Home/components/DaoDetail';
import DaoList from '../pages/Home/components/DaoList';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <DaoList /> },
      {
        path: '/daoDetail/:cid',
        element: <DaoDetail />,
      },
    ],
  },
];
export default function AppRouter() {
  window.scroll(0, 0);
  return useRoutes(routes);
}
