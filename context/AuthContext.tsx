"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import "firebase/auth";

import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

// Initialize Firebase (make sure to configure your own Firebase project
type AuthProps = {
  user: User | null;
  signInWithGoogle: () => void;
  signOut: () => void;
};
const AuthContext = createContext<AuthProps>({
  user: null,
  signInWithGoogle: () => {},
  signOut: () => {},
});
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(authUser);
        router.replace("/");
      } else {
        setUser(null);
        router.replace("/auth");

        console.log("No user signed in -");
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
