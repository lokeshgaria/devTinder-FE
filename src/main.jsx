import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Provider } from "react-redux";
import { store } from "./utils/redux/AppStore/store.js";
import ProfilePage from "./pages/Profile.jsx";
import ConnectionsPage from "./pages/Connections.jsx";
import RequestsPage from "./pages/Requests.jsx";
import NotificationToast from "./components/ToastNotifications.jsx";
import Upgradepack from "./pages/Upgradepack.jsx";
import "./index.css";
import App from "./App.jsx";
import ChatMessages from "./pages/ChatMessages.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/connections",
    element: <ConnectionsPage />,
  }, //Requests
  {
    path: "/requests",
    element: <RequestsPage />,
  },
  {
    path:"/upgrade",
    element:<Upgradepack />
  },
  {
    path: "/chat/:slugId",
    element: <ChatMessages />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <NotificationToast />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
