"use client";
import { useAuth } from "@/context/AuthContext";
import { Fields } from "@/data";
import { studentsCollection } from "@/firebase";
import { Student } from "@/types";
import { Box, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

const AddStudentButton = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student>({
    name: "",
    lastName: "",
    fields: Fields,
    userId: user?.uid!,
  });
  const isValid = student.name && student.lastName;

  const onSubmit = async () => {
    try {
      if (!user) return;
      await addDoc(studentsCollection, { ...student, userId: user.uid });
      toast.success("Student Added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button>
      <Dialog.Root>
        <Dialog.Trigger>
          <Text>Add Student</Text>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add New Student</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                defaultValue={student.name}
                className="capitalize"
                placeholder="John"
                size={"3"}
                onChange={(e) =>
                  setStudent({ ...student, name: e.target.value })
                }
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Last Name
              </Text>
              <TextField.Input
                defaultValue={student.lastName}
                placeholder="Smith"
                className="capitalize"
                size={"3"}
                onChange={(e) =>
                  setStudent({ ...student, lastName: e.target.value })
                }
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                disabled={!isValid}
                onClick={onSubmit}
                color="green"
                variant="outline"
              >
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Button>
  );
};

export default AddStudentButton;
