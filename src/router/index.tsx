import OverView from '@/pages/home/daoDetail/overView/Index';
import React from 'react';

import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '../pages/home';
import DaoDetail from '../pages/home/daoDetail/Index';
import Proposals from '../pages/home/daoDetail/proposals/Index';
import Users from '../pages/home/daoDetail/users/Index';
const Activity = React.lazy(() => import('@/pages/home/daoDetail/activity/Index'));
const Budget = React.lazy(() => import('@/pages/home/daoDetail/budget/Index'));
const BudgetSet = React.lazy(() => import('@/pages/home/daoDetail/budgetSet/Index'));
const Chat = React.lazy(() => import('@/pages/home/daoDetail/chat/Index'));
const Create = React.lazy(() => import('@/pages/home/daoDetail/create/Index'));
// const DaoDetail = React.lazy(() => import('@/pages/home/daoDetail/Index'));
const Nfts = React.lazy(() => import('@/pages/home/daoDetail/nfts/Index'));

const ProposalsCreate = React.lazy(() => import('@/pages/home/daoDetail/proposalsCreate/Index'));

const Setting = React.lazy(() => import('@/pages/home/daoDetail/setting/Index'));
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
  {
    path: '/dao/:cid',
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
      { path: 'ProposalsDetail/:id', element: <ProposalsDetail /> },
      { path: 'Setting', element: <Setting /> },
      { path: 'Task', element: <Task /> },
      { path: 'TimeLine', element: <TimeLine /> },
      { path: 'UserPay', element: <UserPay /> },
    ],
  },
];
export default function AppRouter() {
  // window.scroll(0, 0);

  return <React.Fragment>{useRoutes(routes)}</React.Fragment>;
}
