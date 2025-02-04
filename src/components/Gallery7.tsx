import clsx from "clsx";
import Image from "next/image";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
  title?: string; // Adicionando o campo title
};

type Props = {
  heading: string;
  description?: string;
  images: ImageProps[];
  headingClassName?: string; // Classe customizável para o título
  descriptionClassName?: string; // Classe customizável para a descrição
};

export const Gallery7 = (props: Props) => {
  const {
    heading,
    description,
    images,
    headingClassName,
    descriptionClassName,
  } = props;

  return (
    <section id="relume" className="px-[5%] pb-8 md:pb-10 lg:pb-12"> {/* Reduzindo o padding inferior */}
      <div className="container">
        <div className="mb-8 text-center md:mb-12 lg:mb-14"> {/* Ajustando a margem inferior do título */}
          {/* Aplica classes customizáveis no título */}
          <h2
            className={clsx(
              "text-3xl font-bold text-[#027A48] md:text-3xl lg:text-4xl",
              headingClassName
            )}
          >
            {heading}
          </h2>
          {/* Aplica classes customizáveis na descrição */}
          {description && (
            <p className={clsx("md:text-md", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
        <div className="grid auto-cols-fr justify-center gap-6 md:grid-cols-2 md:gap-8">
          {images.map((image, index) => (
            <a
              key={index}
              href={image.url}
              className={clsx("inline-block w-full", {
                "col-start-1 col-end-2 row-start-1 row-end-3": index === 0,
              })}
            >
              <div
                className={clsx("relative size-full overflow-hidden group", {
                  "pt-[100%]": index === 0,
                  "pt-[56.25%]": index !== 0,
                })}
              >
                <Image
  src={image?.src ?? "/fallback-image.jpg"}
  alt={image?.alt ?? "Imagem sem descrição"}
  fill
  className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-110"
/>
                {/* Sobreposição do título */}
                {image.title && (
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm px-3 py-2">
                    {image.title}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
