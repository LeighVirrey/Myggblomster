import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieList from './components/movies/movie-list/movie-list';
import MovieDetails from './components/movies/movie-details/movie-details';
const BrowserRouter = createBrowserRouter([
  {
    path : '/',
    element : <App />
  },
  {
    path : '/movies',
    element : <MovieList />
  },
  {
    path : '/movies/:id',
    element : <MovieDetails />
  },
  //add the rest idk what files were changed
]);


//we should make partials for the header and footer, but that's for a later date
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={BrowserRouter} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
