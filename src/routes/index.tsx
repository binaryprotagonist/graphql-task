import LaunchesPage from 'pages/LaunchesPage/Index';
import { Route } from 'models/common';

export const routes: Route[] = [
  {
    path: '/',
    element: LaunchesPage,
    isPrivate: false,
  },
];
