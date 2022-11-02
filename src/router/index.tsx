import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
const Demo = React.lazy(() => import('../components/Demo'));
const Swap = React.lazy(() => import('../pages/swap/Index'));
const Pool = React.lazy(() => import('../pages/pool/Index'));
const Aboutnswap = React.lazy(() => import('../pages/aboutnswap/Index'));
const Vote = React.lazy(() => import('../pages/vote/Index'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      // { index: true, element: <Home /> },
      // {
      //   path: "/courses",
      //   element: <Courses />,
      //   children: [
      //     { index: true, element: <CoursesIndex /> },
      //     { path: "/courses/:id", element: <Course /> },
      //   ],
      // },
      // { path: "*", element: <NoMatch /> },
    ],
  },
  {
    path: '/demo',
    element: <Demo />,
    children: [
      // { index: true, element: <Home /> },
      // {
      //   path: "/courses",
      //   element: <Courses />,
      //   children: [
      //     { index: true, element: <CoursesIndex /> },
      //     { path: "/courses/:id", element: <Course /> },
      //   ],
      // },
      // { path: "*", element: <NoMatch /> },
    ],
  },
  {
    path: '/swap',
    element: <Swap></Swap>,
    children: [
      // { index: true, element: <Home /> },
      // {
      //   path: "/courses",
      //   element: <Courses />,
      //   children: [
      //     { index: true, element: <CoursesIndex /> },
      //     { path: "/courses/:id", element: <Course /> },
      //   ],
      // },
      // { path: "*", element: <NoMatch /> },
    ],
  },
  {
    path: '/pool',
    element: <Pool></Pool>,
    children: [
      // { index: true, element: <Home /> },
      // {
      //   path: "/courses",
      //   element: <Courses />,
      //   children: [
      //     { index: true, element: <CoursesIndex /> },
      //     { path: "/courses/:id", element: <Course /> },
      //   ],
      // },
      // { path: "*", element: <NoMatch /> },
    ],
  },
  {
    path: '/aboutnswap',
    element: <Aboutnswap></Aboutnswap>,
    children: [
      // { index: true, element: <Home /> },
      // {
      //   path: "/courses",
      //   element: <Courses />,
      //   children: [
      //     { index: true, element: <CoursesIndex /> },
      //     { path: "/courses/:id", element: <Course /> },
      //   ],
      // },
      // { path: "*", element: <NoMatch /> },
    ],
  },
  {
    path: '/vote',
    element: <Vote></Vote>,
    children: [
      // { index: true, element: <Home /> },
      // {
      //   path: "/courses",
      //   element: <Courses />,
      //   children: [
      //     { index: true, element: <CoursesIndex /> },
      //     { path: "/courses/:id", element: <Course /> },
      //   ],
      // },
      // { path: "*", element: <NoMatch /> },
    ],
  },
];
export default function AppRouter() {
  window.scroll(0, 0);
  return useRoutes(routes);
}
