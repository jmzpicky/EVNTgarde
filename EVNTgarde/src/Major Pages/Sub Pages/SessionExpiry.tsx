import { auth } from "../../firebase";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

const handleSessionExpiry = async (email: string, password: string, rememberMe: boolean) => {
  try {
    // Set persistence based on the 'rememberMe' checkbox
    const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    
    await setPersistence(auth, persistenceType);
    
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in: ", userCredential.user);
  } catch (error: any) {
    console.error("Login error: ", error.message);
  }
};

export default handleSessionExpiry;
