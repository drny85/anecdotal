export type Student = {
  id?: string;
  name: string;
  lastName: string;
  fields: FieldValues[];
  userId: string;
};

export type Category =
  | "Social Emotional"
  | "Language"
  | "Cognitive"
  | "Science & Tecnology"
  | "Social Studies"
  | "The Arts"
  | "English Language Acquisition"
  | "Literacy"
  | "Mathematics"
  | "Physical";

export type Anecdotal = {
  id?: string;
  student: Student;
  topics: Topic[];
};

export type Topic = {
  label: string;
  value: Category;
};
export type Field = {
  value: string;
  name: string;
  focus?: string[];
};

export type FieldValues = { id: number; value: Category; subvalue: Field[] };
