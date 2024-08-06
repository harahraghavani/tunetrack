import { useFirebase } from "../hooks/firebase/useFirebase";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { accessToken } = useFirebase();
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
