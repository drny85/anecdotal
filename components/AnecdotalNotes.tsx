import { FieldValues } from "@/types";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text, TextArea } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

type Props = {
  fields: FieldValues[];
};
const AnecdotalNotes = ({ fields }: Props) => {
  const [state, setState] = useState(fields);
  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    let value = e.target.value;
    state.forEach((f) => {
      const t = f.subvalue.find((s) => s.name === name);
      if (t) {
        t.value = value;
        //console.log(t);
        const newState = [...state];
        const s = newState.map((s) => {
          if (s.value === f.value) {
            s.subvalue = f.subvalue;
          }
          return s; // return the object to maintain immutability.
        });

        setState(s);
      }
    });

    // console.log(e.target.value);
  };
  useEffect(() => {
    setState(fields);
  }, [fields]);
  return (
    <Box>
      {state.map((c) => (
        <Flex key={c.id} direction={"column"} gap={"5"} my="6">
          <Accordion.Root type="single" collapsible>
            <Accordion.Item className="AccordionItem" value={c.value}>
              <Accordion.Trigger className="text-xl font-semibold flex items-center justify-between w-full">
                {c.id} - {c.value}
                <ChevronDownIcon
                  className="AccordionChevron"
                  aria-hidden
                  fontSize={36}
                />
              </Accordion.Trigger>
              <Accordion.Content>
                {c.subvalue.map((f, i) => (
                  <Box key={f.name} my={"3"} p={"2"}>
                    <Text className="font-semibold">
                      {i + 1}- {f.name}
                    </Text>
                    <TextArea
                      placeholder={`Write ${f.name}`}
                      value={f.value}
                      onChange={(e) => onChange(e, f.name)}
                    />
                  </Box>
                ))}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Flex>
      ))}
    </Box>
  );
};

export default AnecdotalNotes;