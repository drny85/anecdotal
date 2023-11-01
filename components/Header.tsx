"use client";
import { Avatar, Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import React from "react";
import AddStudentButton from "./AddStudentButton";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const Header = () => {
  const { user } = useAuth();
  return (
    <nav>
      <Flex justify="between">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar radius="full" fallback="?" src={user?.photoURL!} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="mt-2">
            <DropdownMenu.Item>
              <Button onClick={() => signOut(auth)} variant="soft">
                Log Out
              </Button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Text className="font-bold" size={"5"}>
          My Students
        </Text>
        <AddStudentButton />
      </Flex>
    </nav>
  );
};

export default Header;
