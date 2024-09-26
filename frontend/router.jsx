import { createBrowserRouter } from "react-router-dom"
import { Login } from "./src/pages/login";
import { DefaultLayout } from "./src/layout/default";
import { Patients } from "./src/pages/patients";



export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/patients",
        element: <Patients />
      },
    ]
  }
]);