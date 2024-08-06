// React and Third party libraries
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

// components
import RotatingLinesLoader from "./components/RotatingLinesLoader";
import PrivateRoute from "./router/PrivateRoute";

// css
import "./App.css";
import { useFirebase } from "./hooks/firebase/useFirebase";

// pages
const AuthPage = lazy(() => import("./views/authentication/Auth"));
const HomePage = lazy(() => import("./views/Home/Home"));
const FavouritePage = lazy(() => import("./views/Favourite/Favourite"));

function App() {
  const { accessToken } = useFirebase();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      if (location.pathname === "/login") {
        navigate("/");
        return;
      }
    } else {
      if (location.pathname !== "/login") {
        navigate("/login");
        return;
      }
    }
  }, [accessToken, location.pathname]);

  return (
    <div className="App">
      <Suspense
        fallback={
          <Flex justifyContent="center" alignItems="center" height="100svh">
            <RotatingLinesLoader />
          </Flex>
        }
      >
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<AuthPage />} />
          {/* PRIVATE ROUTES  */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourite" element={<FavouritePage />} />
            <Route path="/*" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
