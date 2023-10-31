"use client";
import { Button } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <Button className="w-1/2" size="4" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
