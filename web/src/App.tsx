import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import React from "react";
import Loader from "./components/Loader";
import AuthPage from "./pages/AuthPage";
import AuthRoutes from "./components/AuthRoutes";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import TrendingPage from "./pages/TrendingPage";
import BookmarkPage from "./pages/BookmarkPage";
import NotFoundPage from "./pages/NotFoundPage";
const Lazy = React.lazy(() => import("./components/RootLayout"));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <AuthRoutes type="Protected">
              <React.Suspense fallback={<Loader value="#fb2c36" size={72} />}>
                <Lazy />
              </React.Suspense>
            </AuthRoutes>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="notifications" element={<NotificationsPage /> } />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="bookmark" element={<BookmarkPage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
        </Route>
        <Route
          path="/auth"
          element={
            <AuthRoutes type="Public">
              <AuthPage />
            </AuthRoutes>
          }
        />
          <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
