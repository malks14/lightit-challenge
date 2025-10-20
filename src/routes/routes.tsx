import { RouteObject } from 'react-router-dom';

import RootMainLayout from '../components/UI/RootMainLayout';

import HomePage from '../pages/Home/HomePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootMainLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
];

export default routes;
