import MY_APP from "../config/FirebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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
  const db = getFirestore(MY_APP);

  // hooks
  const toast = useToast();

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [favouriteList, setFavouriteList] = useState([]);

  const [loader, setLoader] = useState(false);

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

  const addSongToFavouriteList = async ({ data }) => {
    const songInfo = data; // Ensure data contains the correct structure
    setIsAdd(data?.key);

    try {
      // Add the song to the user's favourites collection
      await addDoc(collection(db, "users", user?.email, "favourites"), {
        ...songInfo,
      });

      await getFavouriteListData();

      // Set adding state to false
      setIsAdd(false);

      // Show a success toast
      toast({
        title: "Added to favourites",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      // Handle errors with a toast
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsAdd(false); // Ensure isAdd is set to false in all cases
    }
  };

  const removeSongFromFavouriteList = async (songKey) => {
    try {
      // Find the document with the specified key
      const favouritesCollection = collection(
        db,
        "users",
        user?.email,
        "favourites"
      );

      // Query the document by songKey
      const q = query(favouritesCollection, where("key", "==", songKey));
      const querySnapshot = await getDocs(q);

      // Check if the document exists
      if (!querySnapshot.empty) {
        // Assuming there's only one document with the given songKey
        const docId = querySnapshot.docs[0].id;

        // Delete the document
        await deleteDoc(doc(favouritesCollection, docId));

        // Update the local state
        setFavouriteList((prevList) =>
          prevList.filter((song) => song.key !== songKey)
        );

        // Show a success toast
        toast({
          title: "Removed from favourites",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        // If no document is found
        toast({
          title: "Error",
          description: "Song not found in favourites",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      // Handle errors with a toast
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const getFavouriteListData = async () => {
    if (!userData) {
      return;
    }
    setLoader(true);
    try {
      // Correct the query by removing the unnecessary where clause
      const favouritesCollection = collection(
        db,
        "users",
        userData?.email,
        "favourites"
      );

      const querySnapshot = await getDocs(favouritesCollection);

      if (querySnapshot.empty) {
        // Log for debugging
        setFavouriteList([]); // Update the state to reflect no images found
        setLoader(false);
        return;
      }

      // Extract the data from querySnapshot
      const favouritesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID if needed
        ...doc.data(),
      }));

      setFavouriteList(favouritesArray); // Update the state with the favourites
      // Log the array of favourites
    } catch (error) {
      // Log error for debugging
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    isUserExist();
    getFavouriteListData();
  }, []);

  const values = {
    firebaseMethods: {
      signUpWithGoogle,
      logoutUser,
      addSongToFavouriteList,
      getFavouriteListData,
      removeSongFromFavouriteList,
    },
    states: {
      isLoading,
      user,
      favouriteList,
      loader,
      isAdd,
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
