import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Blog } from "./pages/Blog.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { io } from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

// -----------------------------
// BROWSER-ONLY SETUP
// -----------------------------
let router = null;
let socket = null;

if (typeof document !== "undefined") {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Blog />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
}

if (typeof window !== "undefined") {
  socket = io(import.meta.env.VITE_SOCKET_HOST);

  socket.on("connect", () => {
    console.log("connected to socket.io as", socket.id);
    socket.emit(
      "chat.message",
      new URLSearchParams(window.location.search).get("mymsg")
    );
  });

  socket.on("connect_error", (err) => {
    console.error("socket.io connect error:", err);
  });
  socket.on("chat.message", (msg) => {
    console.log(`${msg.username}: ${msg.message}`);
  });
}

export function App() {
  // During SSR, router is null; avoid rendering RouterProvider there
  if (!router) return null;

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
