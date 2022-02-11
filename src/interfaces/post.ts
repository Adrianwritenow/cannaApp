export interface Post {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    id: number;
    author: string[];
    content: string[];
    description: string[];
    created: number[];
    exclusive: boolean[];
    featured: boolean[];
    image: string[];
    main_alt: string[];
    title: string[];
    _language: string;
    _type: string;
  };
}
