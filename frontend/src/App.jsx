import { RouterProvider } from "react-router-dom"

import './index.css'
import { router } from "../router"
import { AuthProvider } from "./context/authContext"

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>)
}

export default App
