import MY_APP from "../config/FirebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { clearCookie, createCookie, getCookie } from "../utility/utils/utils";
import { USER_ACCESS_TOKEN, USER_DATA } from "../appConstants/constant";
import { useNavigate } from "react-router-dom";

const { createContext, useState, useEffect } = require("react");

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  // REACT ROUTER
  const navigate = useNavigate();
  // FIREBASE
  const auth = getAuth(MY_APP);
  const googleProvider = new GoogleAuthProvider();

  // hooks
  const toast = useToast();

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // COOKIE DATA
  const accessToken = getCookie(USER_ACCESS_TOKEN);
  const userData = getCookie(USER_DATA);

  const signUpWithGoogle = async () => {
    setIsLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        createCookie(USER_ACCESS_TOKEN, result?.user?.accessToken);
        createCookie(USER_DATA, result?.user);
        toast({
          title: "Logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isUserExist = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        clearCookie(USER_ACCESS_TOKEN);
        clearCookie(USER_DATA);
        toast({
          title: "Logged out successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/login");
      })
      .catch((error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => {});
    clearCookie(USER_ACCESS_TOKEN);
    clearCookie(USER_DATA);
  };

  useEffect(() => {
    isUserExist();
  }, []);

  const values = {
    firebaseMethods: {
      signUpWithGoogle,
      logoutUser,
    },
    states: {
      isLoading,
      user,
    },
    accessToken,
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
