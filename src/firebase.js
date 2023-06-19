import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { config } from "./config";

const initialize = () => {
  const firebase = initializeApp(config.firebase);
  const auth = getAuth(firebase);
  const firestore = getFirestore(firebase);

  if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestore, "localhost", 9000);
  }

  return { firebase, auth, firestore };
};

export default initialize;
