import OverView from '@/pages/home/daoDetail/overView/Index';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const Activity = React.lazy(() => import('@/pages/home/daoDetail/activity/Index'));
const Budget = React.lazy(() => import('@/pages/home/daoDetail/budget/Index'));
const BudgetSet = React.lazy(() => import('@/pages/home/daoDetail/budgetSet/Index'));
const Chat = React.lazy(() => import('@/pages/home/daoDetail/chat/Index'));
const Create = React.lazy(() => import('@/pages/home/daoDetail/create/Index'));
const DaoDetail = React.lazy(() => import('@/pages/home/daoDetail/Index'));
const Nfts = React.lazy(() => import('@/pages/home/daoDetail/nfts/Index'));
const Proposals = React.lazy(() => import('@/pages/home/daoDetail/proposals/Index'));
const ProposalsCreate = React.lazy(() => import('@/pages/home/daoDetail/proposalsCreate/Index'));
const ProposalsDetail = React.lazy(() => import('@/pages/home/daoDetail/proposalsDetail/Index'));
const Setting = React.lazy(() => import('@/pages/home/daoDetail/setting/Index'));
const Task = React.lazy(() => import('@/pages/home/daoDetail/task/Index'));
const TimeLine = React.lazy(() => import('@/pages/home/daoDetail/timeLine/Index'));
const Users = React.lazy(() => import('@/pages/home/daoDetail/users/Index'));
const UserPay = React.lazy(() => import('@/pages/home/daoDetail/userPay/Index'));
const DaoList = React.lazy(() => import('@/pages/home/daoList/Index'));
const Home = React.lazy(() => import('@/pages/home/Index'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <DaoList /> },
      {
        path: '/daoDetail/:cid',
        element: <DaoDetail />,
        children: [
          { index: true, element: <OverView /> },
          { path: 'OverView', element: <OverView /> },
          { path: 'Users', element: <Users /> },
          { path: 'Proposals', element: <Proposals /> },
          { path: 'Chat', element: <Chat /> },
          { path: 'Activity', element: <Activity /> },
          { path: 'Budget', element: <Budget /> },
          { path: 'BudgetSet', element: <BudgetSet /> },
          { path: 'Create', element: <Create /> },
          { path: 'Nfts', element: <Nfts /> },
          { path: 'ProposalsCreate', element: <ProposalsCreate /> },
          { path: 'ProposalsDetail', element: <ProposalsDetail /> },
          { path: 'Setting', element: <Setting /> },
          { path: 'Task', element: <Task /> },
          { path: 'TimeLine', element: <TimeLine /> },
          { path: 'UserPay', element: <UserPay /> },
        ],
      },
    ],
  },
]);
export default function AppRouter() {
  window.scroll(0, 0);
  return <RouterProvider router={routes}></RouterProvider>;
}
