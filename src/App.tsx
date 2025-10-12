import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Movies from "./components/pages/Movies/Movies"
import MovieDetails from "./components/pages/MovieDetail/MovieDetail"
import ActorDetails from "./components/pages/ActorDetail/ActorDetail"
import MoviesListTop from "./components/pages/MoviesListTop/MoviesListTop"
import { MOVIE_LISTS, TOP_LISTS } from "./constants"
import MoviesListMain from "./components/pages/MoviesListMain/MoviesListMain"

function App() {
const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Movies />,
        },
        ...TOP_LISTS.map(el => ({
          path: el.url,
          element: <MoviesListTop/>,
        })),
        ...MOVIE_LISTS.map(el=>({
          path:el.url,
          element:<MoviesListMain/>
        })),
        {
          path: '/movie/:id',
          element: <MovieDetails/>,
        },
        {
          path: '/actor/:id',
          element: <ActorDetails />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
