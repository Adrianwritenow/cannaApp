export interface Post {
  author: string;
  canonical_link: string;
  categories?: string[] | null;
  content: string;
  created_at: string;
  description: string;
  exclusive: boolean;
  featured: boolean;
  featured_image_google_cache_url: string;
  featured_url?: string | null;
  id: number;
  image_google_cache_url: string;
  last_featured_fetch_at: string;
  main_alt: string;
  published: string;
  rating?: number | null;
  seo_title: string;
  slug: string;
  title: string;
  updated_at: string;
  url: string | null;
  views: number;
  image: string;
  featured_image: string;
  column_article_asignments?: string[]
  columns?: string[];
  comments?: string[];
}

