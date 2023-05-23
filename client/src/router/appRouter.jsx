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
            <Suspense>
              <LazyRegister />
            </Suspense>
          }
        />
        <Route
          path="/myvideos"
          element={
            <Suspense>
              <LazyMyVideosPage />
            </Suspense>
          }
        />
        <Route
          path="/searchlist"
          element={
            <Suspense>
              <LazySearchedList />
            </Suspense>
          }
        />
        <Route
          path="/searchlist/video/:videoId"
          element={
            <Suspense>
              <LazyVideoPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <LazyPageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense>
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path="/home/video/:videoId"
          element={
            <Suspense>
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
