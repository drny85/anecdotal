"use client";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import React from "react";
import AddStudentButton from "./AddStudentButton";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <nav>
      <Flex justify="between">
        <Avatar radius="full" fallback="?" src={user?.photoURL!} />
        <Text className="font-bold" size={"5"}>
          My Students
        </Text>
        <AddStudentButton />
      </Flex>
    </nav>
  );
};

export default Header;
