import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { auth } from "../hooks/firebase";
export function useAuthRedirect() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
//   const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin"); // Redireciona para login se não estiver autenticado
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
}, [router]);

  return { loading };
}
