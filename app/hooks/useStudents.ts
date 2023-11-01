import { useAuth } from "@/context/AuthContext";
import { studentsCollection } from "@/firebase";
import { Student } from "@/types";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useStudents = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("useStudents");
    if (!user) {
      setLoading(false);
      return;
    }
    const docQuery = query(studentsCollection, where("userId", "==", user.uid));
    const sub = onSnapshot(docQuery, (snap) => {
      setStudents(
        snap.docs
          .map((s) => ({ id: s.id, ...s.data() }))
          .sort((a, b) =>
            a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
          )
      );
      setLoading(false);
    });
    return sub;
  }, [user]);

  return { students, loading };
};
