import OverView from '@/pages/home/daoDetail/overView/Index';
import React from 'react';

import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Home from '../pages/home';
import Create from '../pages/home/daoDetail/create/Index';
import DaoDetail from '../pages/home/daoDetail/Index';
import Proposals from '../pages/home/daoDetail/proposals/Index';
import ProposalsCreate from '../pages/home/daoDetail/proposalsCreate/Index';
import ProposalDetail from '../pages/home/daoDetail/proposalsDetail/Index';
import Setting from '../pages/home/daoDetail/setting/Index';
import Users from '../pages/home/daoDetail/users/Index';
import User from '../pages/user';
const Activity = React.lazy(() => import('@/pages/home/daoDetail/activity/Index'));
const Budget = React.lazy(() => import('@/pages/home/daoDetail/budget/Index'));
const BudgetSet = React.lazy(() => import('@/pages/home/daoDetail/budgetSet/Index'));
const Chat = React.lazy(() => import('@/pages/home/daoDetail/chat/Index'));

const Nfts = React.lazy(() => import('@/pages/home/daoDetail/nfts/Index'));
const Task = React.lazy(() => import('@/pages/home/daoDetail/task/Index'));
const TimeLine = React.lazy(() => import('@/pages/home/daoDetail/timeLine/Index'));
// const Users = React.lazy(() => import('@/pages/home/daoDetail/users/Index'));

const UserPay = React.lazy(() => import('@/pages/home/daoDetail/userPay/Index'));
const DaoList = React.lazy(() => import('@/pages/home/daoList/Index'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home></Home>,
    index: true,
  },
  { path: '/createDao', element: <Create /> },
  { path: '/user', element: <User></User> },
  {
    path: '/dao/:cid',
    element: <DaoDetail />,
    children: [
      { index: true, element: <OverView /> },
      { path: 'OverView', element: <OverView /> },
      { path: 'Users', element: <Users /> },
      {
        path: 'Proposals',
        element: <Outlet></Outlet>,
        children: [
          { index: true, element: <Proposals /> },
          { path: 'create', element: <ProposalsCreate /> },
          { path: 'detail/:id', element: <ProposalDetail /> },
        ],
      },
      { path: 'Chat', element: <Chat /> },
      { path: 'Activity', element: <Activity /> },
      { path: 'Budget', element: <Budget /> },
      { path: 'BudgetSet', element: <BudgetSet /> },
      { path: 'Nfts', element: <Nfts /> },
      { path: 'Setting', element: <Setting /> },
      { path: 'Task', element: <Task /> },
      { path: 'TimeLine', element: <TimeLine /> },
      { path: 'UserPay', element: <UserPay /> },
    ],
  },
];
export default function AppRouter() {
  const elements = useRoutes(routes);
  window.scroll(0, 0);
  return <React.Fragment>{elements}</React.Fragment>;
}
