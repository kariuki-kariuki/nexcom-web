export interface ImageGallery {
  id: number;
  url: string;
  name: string | null;
  altText: string;
}
export interface IGallery {
  id: number;
  name: string;
  images: ImageGallery[];
}
