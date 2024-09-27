import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const { token, sigin } = useContext(AuthContext);
  return { token, sigin };

}