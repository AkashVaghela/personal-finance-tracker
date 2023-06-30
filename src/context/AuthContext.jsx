import { useEffect, useReducer, createContext, useState } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import useUserNavigation from "../hooks/useUserNavigation";
import { getFirebase } from "../firebase";

export const AuthContext = createContext();

const setUser = (payload) => {
  localStorage.setItem("user", JSON.stringify(payload));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP_WITH_EMAIL":
      setUser(action.payload);
      return { ...state, user: action.payload };
    case "SIGN_IN_WITH_EMAIL":
      setUser(action.payload);
      return { ...state, user: action.payload };
    case "SIGN_IN_WITH_GOOGLE":
      setUser(action.payload);
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      removeUser();
      return { ...state, user: null };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const { auth } = getFirebase();
  const { navigateToDashboard, navigateToSignUp, navigateToSignIn } =
    useUserNavigation();
  const googleProvider = new GoogleAuthProvider(auth);

  const initialState = { user: null };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user?.uid ? navigateToDashboard() : navigateToSignIn();
  }, [state]);

  const emailSignUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      dispatch({ type: "SIGN_UP_WITH_EMAIL", payload: userCredential.user });
      navigateToDashboard();
    }
  };

  const emailSignIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      dispatch({ type: "SIGN_IN_WITH_EMAIL", payload: userCredential.user });
      navigateToDashboard();
    }
  };

  const googleSignIn = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    if (userCredential.operationType === "signIn") {
      dispatch({ type: "SIGN_IN_WITH_GOOGLE", payload: userCredential.user });
      navigateToDashboard();
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    dispatch({ type: "SIGN_OUT" });
    navigateToSignUp();
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        emailSignUp,
        emailSignIn,
        googleSignIn,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
