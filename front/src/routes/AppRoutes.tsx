import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context";
import { pablicRoutes, privateRoutes } from "./Routes";
import MyLoader from "../components/Loader/MyLoader";

export default function AppRoutes() {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return (
      <div>
        <MyLoader />
      </div>
    );
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} element={route.component} path={route.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {pablicRoutes.map((route) => (
        <Route key={route.path} element={route.component} path={route.path} />
      ))}
    </Routes>
  );
}
