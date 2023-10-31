import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import AddStudentButton from "./AddStudentButton";

const Header = () => {
  return (
    <nav>
      <Flex justify="between">
        <Text className="font-bold" size={"5"}>
          My Students
        </Text>
        <AddStudentButton />
      </Flex>
    </nav>
  );
};

export default Header;
