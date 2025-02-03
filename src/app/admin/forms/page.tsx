'use client';
import CreateObra from '~/components/obras/CreateObra'
import EditObra from '~/components/obras/EditObra'
import RemoveObra from '~/components/obras/RemoveObra'
import CreateVideo from '~/components/videos/CreateVideos'
import EditVideo from '~/components/videos/EditVideo'
import RemoveVideo from '~/components/videos/RemoveVideo'
import { useAuthRedirect } from "../../../../hooks/useAuthRedirect";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../hooks/firebase";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin"); // Se não estiver autenticado, redireciona para login
      } else {
        setLoading(false); // Se autenticado, para de carregar
      }
    });

    return () => unsubscribe(); // Cleanup da verificação
  }, [router]);

  if (loading) {
    return <p>Carregando...</p>; // Mostra uma tela de carregamento enquanto verifica
  }

    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <h1 className="text-3xl font-bold text-center py-6 bg-[#027A48] text-white">Gerenciamento de Obras e Vídeos</h1>
          <div className="p-6 space-y-8">
          <section>

      <h2 className="text-2xl font-semibold mb-4 text-[#027A48]">Obras</h2>
      <div className="space-y-6">
        <CreateObra />
        <EditObra />
        <RemoveObra />
      </div>
    </section>
        <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#027A48]">Vídeos</h2>
        <div className="space-y-6">
          <CreateVideo />
          <EditVideo />
          <RemoveVideo />
        </div>
      </section>
      </div>
      </div>
    </main>
  );
};