import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main';
import Home from '../pages/Home';
import Article from '../pages/Article';
import Topic from '../pages/Topic';

const router = createBrowserRouter([
  {
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/article/:id/:slug', element: <Article /> },
      { path: '/topic/:id/:categoryName', element: <Topic /> },
    ],
  },
]);

export default router;
