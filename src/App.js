// React and Third party libraries
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Flex } from "@chakra-ui/react";

// components
import RotatingLinesLoader from "./components/RotatingLinesLoader";
import PrivateRoute from "./router/PrivateRoute";

// css
import "./App.css";

// pages
const AuthPage = lazy(() => import("./views/authentication/Auth"));
const HomePage = lazy(() => import("./views/Home/Home"));
const FavouritePage = lazy(() => import("./views/Favourite/Favourite"));

function App() {
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
