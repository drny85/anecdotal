"use client";
import { studentsCollection } from "@/firebase";
import { Student } from "@/types";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = onSnapshot(studentsCollection, (snap) => {
      setStudents(snap.docs.map((s) => ({ id: s.id, ...s.data() })));
      setLoading(false);
    });
    return sub;
  }, []);

  return { students, loading };
};
