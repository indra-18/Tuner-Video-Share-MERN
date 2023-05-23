import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LazyHome = lazy(() => import("../components/homePage/Home"));
const LazyRegister = lazy(() => import("../components/registerPage/Register"));
const LazyLogin = lazy(() => import("../components/loginPage/Login"));
const LazyMyVideosPage = lazy(() =>
  import("../components/myVideosPage/MyVideosPage")
);
const LazySearchedList = lazy(() =>
  import("../components/searchListPage/SearchedList")
);
const LazyVideoPage = lazy(() => import("../components/videoPage/VideoPage"));
const LazyPageNotFound = lazy(() => import("../components/PageNotFound"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="Loading...">
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback="Loading...">
              <LazyRegister />
            </Suspense>
          }
        />
        <Route
          path="/myvideos"
          element={
            <Suspense fallback="Loading...">
              <LazyMyVideosPage />
            </Suspense>
          }
        />
        <Route
          path="/searchlist"
          element={
            <Suspense fallback="Loading...">
              <LazySearchedList />
            </Suspense>
          }
        />
        <Route
          path="/searchlist/video/:videoId"
          element={
            <Suspense fallback="Loading...">
              <LazyVideoPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback="Loading...">
              <LazyPageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback="Loading...">
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path="/home/video/:videoId"
          element={
            <Suspense fallback="Loading...">
              <LazyVideoPage />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
};

export default AppRouter;
