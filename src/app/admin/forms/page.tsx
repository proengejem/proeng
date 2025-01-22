import CreateObra from '~/components/obras/CreateObra'
import EditObra from '~/components/obras/EditObra'
import RemoveObra from '~/components/obras/RemoveObra'
import CreateVideo from '~/components/videos/CreateVideos'
import EditVideo from '~/components/videos/EditVideo'
import RemoveVideo from '~/components/videos/RemoveVideo'

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y5GJKN3V0L"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Y5GJKN3V0L');
</script>

export default function Home() {
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

function tag(js: any) {
  throw new Error('Function not implemented.')
}
