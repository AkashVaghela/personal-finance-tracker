import { useEffect, useReducer, createContext } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirebase } from "../firebase";

export const AuthContext = createContext();

const setUser  = (payload) => {
  localStorage.setItem("user", JSON.stringify(payload));
};

const removeUser  = () => {
  localStorage.removeItem("user");
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP_WITH_EMAIL":
      setUser(action.payload);
      return { ...state, user: action.payload };
    case "SIGN_UP_WITH_GOOGLE":
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
  const googleProvider = new GoogleAuthProvider(auth);

  const initialState = { user: null };
  const [state, dispatch] = useReducer(authReducer, initialState);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if(storedUser) {
      dispatch({type: "SIGN_IN_WITH_EMAIL", payload: JSON.parse(storedUser)});
    } 
  }, [])

  const emailSignUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch({ type: "SIGN_UP_WITH_EMAIL", payload: userCredential.user });
  };

  const googleSignUp = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    dispatch({ type: "SIGN_UP_WITH_GOOGLE", payload: userCredential.user });
  };

  const emailSignIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch({ type: "SIGN_IN_WITH_EMAIL", payload: userCredential.user });
  };

  const googleSignIn = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    dispatch({ type: "SIGN_IN_WITH_GOOGLE", payload: userCredential.user });
  };

  const signOutUser = async () => {
    await signOut(auth);
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        emailSignUp,
        googleSignUp,
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
