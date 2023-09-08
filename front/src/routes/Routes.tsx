import React from "react";
import { ROUTES } from "./constants";
import Page404 from "../pages/Page404/page404";
import Login from "../pages/Login/Login";
import Account from "../pages/Account/Account";
import Books from "../pages/Books/Books";
import Book from "../pages/Book/Book";

export const privateRoutes = [
  { path: ROUTES.ERROR, component: <Page404 />, exact: true },
  { path: ROUTES.LOGIN, component: <Account />, exact: true },
  { path: ROUTES.BOOKS, component: <Books />, exact: true },
  { path: ROUTES.BOOK, component: <Book />, exact: true },
];

export const pablicRoutes = [
  { path: ROUTES.ERROR, component: <Page404 />, exact: true },
  { path: ROUTES.LOGIN, component: <Login />, exact: true },
  { path: ROUTES.BOOKS, component: <Books />, exact: true },
  { path: ROUTES.BOOK, component: <Book />, exact: true },
];
