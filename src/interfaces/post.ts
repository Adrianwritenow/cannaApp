export interface Post {
  id: string;
  title: string;
  href: string;
  topic: {
    name: string;
    href: string;
  };
  imageUrl: string;
  imageAltText: string;
  date: string;
  datetime: string;
  author: {
    name: string;
    href: string;
  };
}
