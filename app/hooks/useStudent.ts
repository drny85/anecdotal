import { studentsCollection } from "@/firebase";
import { Student } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useStudent = (id: string) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) {
      setLoading(false);

      return;
    }
    console.log("useStudent");
    const docRef = doc(studentsCollection, id);
    const sub = onSnapshot(docRef, (snap) => {
      setStudent({ id: snap.id, ...snap.data() } as Student);
      setLoading(false);
      console.log(snap.data());
    });
    return sub;
  }, [id]);

  return { student, loading };
};
