import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Rootlayout from "./components/RootLayout.jsx";
import Home from "./components/common/Home.jsx";
import Footer from "./components/common/Footer.jsx";
import Header from "./components/common/Header.jsx";
import SignIn from "./components/common/SignIn.jsx";
import SignUp from "./components/common/SignUp.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import UserAuthorContext from "./contexts/UserAuthorContext.jsx"; // You can rename or adjust this
import Leaderboard from "./components/leaderboard/Leaderboard.jsx";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

// Define the routing structure
const browserRouterObj = createBrowserRouter(
  [
    {
      path: "/",
      element: <Rootlayout />, // Root layout includes <Header />, <Outlet />, <Footer />
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "leaderboard",
          element: <Leaderboard />,
        },
        // {
        //   path: "community",
        //   element: <Community />,
        // },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "",
          element: <Navigate to="/" />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider>
      <UserAuthorContext>
        <RouterProvider
          router={browserRouterObj}
          future={{ v7_startTransition: true }}
        />
      </UserAuthorContext>
    </PrimeReactProvider>
  </StrictMode>
);
