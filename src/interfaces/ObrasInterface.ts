export type Obra = {
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery: { title: string; url: string; src: string; alt: string }[];
};