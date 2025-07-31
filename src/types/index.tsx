// src/types/index.ts
export type Work = {
  id: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  url: string;
  url_text: string;
  categories: string[];
  images: string[];
  publicIds: string[];
};

export type FormData = {
  title: string;
  slug: string;
  client: string;
  description: string;
  url: string;
  url_text: string;
  categories: string[];
  images: (string | File | undefined)[];
  publicIds: string[];
};
