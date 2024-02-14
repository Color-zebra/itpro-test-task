import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "@/pages/main";

const routerConfig = [
  {
    path: "/",
    element: <MainPage />,
  },
];

const router = createBrowserRouter(routerConfig);

export const RouterApp = () => <RouterProvider router={router} />;
