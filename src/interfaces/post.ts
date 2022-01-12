export interface Post {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    author: string[];
    content: string[];
    description: string[];
    exclusive: boolean[];
    featured: boolean[];
    image_url: string[];
    main_alt: string[];
    title: string[];
    _language: string;
    _type: string;
  };
}
