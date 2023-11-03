"use client";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both fields");
      return;
    }
    try {
      signIn(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col max-w-md mx-auto">
      <Flex
        direction={"column"}
        className="w-full"
        gap={"5"}
        style={{ maxWidth: 480 }}
      >
        <input
          className="rounded-lg outline-none px-2 py-3 bg-slate-200 focus:bg-slate-100 text-xl"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <input
          className="rounded-lg outline-none px-2 py-3 bg-slate-200 focus:bg-slate-100 text-xl"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
        <Button className="w-1/2 self-center" size="4" onClick={onLogin}>
          Login
        </Button>
      </Flex>
    </div>
  );
};

export default Login;
