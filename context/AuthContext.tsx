"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import "firebase/auth";

import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Initialize Firebase (make sure to configure your own Firebase project
type AuthProps = {
  user: User | null;
  signIn: (email: string, password: string) => void;
};
const AuthContext = createContext<AuthProps>({
  user: null,
  signIn: () => {},
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

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(user);
      toast.success("Successfully signed in");
    } catch (error) {
      const err = error as Error;
      console.error("Error signing in", error);
      toast.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
