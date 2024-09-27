import { createBrowserRouter } from "react-router-dom"
import { Login } from "./src/pages/login";
import { DefaultLayout } from "./src/layout/default";
import { Patients } from "./src/pages/patients";
import { Patient } from "./src/pages/patient";



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
      {
        path: "/patients/:id",
        element: <Patient />
      },
      {
        path: "/appointments",
        element: <h1>Appointment</h1>
      },
    ]
  }
]);