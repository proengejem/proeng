import React from "react";

interface VideoCardProps {
  videoUrl: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, title, description, linkText, linkUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={videoUrl}
          title={title}
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 font-semibold hover:underline" style={{ color: '#027A48' }}
        >
          {linkText} →
        </a>
      </div>
    </div>
  );
};

const SolutionsSectionVideos: React.FC = () => {
  const videos = [
    {
      videoUrl: "https://youtu.be/Dm6TIenXuOs?feature=shared",
      title: "Estaca Raiz",
      description:
        "A Fundações Estaque é especializada em Estaca Raiz, soluções técnicas ...",
      linkText: "Ver vídeo",
      linkUrl: "https://youtu.be/Dm6TIenXuOs?feature=shared",
    },
    {
      videoUrl: "https://youtu.be/ouioLUJWd0Q?feature=shared",
      title: "Solo Grampeado",
      description:
        "O Solo Grampeado é uma opção para estabilizar encostas ...",
      linkText: "Ver vídeo",
      linkUrl: "https://youtu.be/ouioLUJWd0Q?feature=shared",
    },
    {
      videoUrl: "https://youtu.be/Z6oR9i-blgw?feature=shared",
      title: "Estaca Hélice",
      description:
        "A Fundações Estaque é especializada em execução de Estaca Hélice...",
      linkText: "Ver vídeo",
      linkUrl: "https://youtu.be/Z6oR9i-blgw?feature=shared",
    },
  ];

  return (
    <div className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Explore nossos vídeos e conheça nosso trabalho        </h2>
        {/* <p className="text-center text-gray-600 mb-8">
        </p> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700" style={{ backgroundColor: '#027A48' }}>
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSectionVideos;