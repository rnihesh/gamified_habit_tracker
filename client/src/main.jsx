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
import Community from "./components/community/Community.jsx";

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
        {
          path: "community",
          element: <Community />,
        },
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


// Utility function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Request notification permission and subscribe for push notifications
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      const vapidPublicKey = 'YOUR_PUBLIC_VAPID_KEY'; // Replace with your actual public key
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      })
      .then(subscription => {
        console.log('User is subscribed:', subscription);
        // TODO: Send the subscription object to your server for storage
      })
      .catch(err => console.error('Subscription error: ', err));
    });
  } else {
    console.error('Notification permission not granted.');
  }
});


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
