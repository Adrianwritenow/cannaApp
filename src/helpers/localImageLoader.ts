import { ImageLoaderProps } from 'next/image';

export const imageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps): string => {
  const paramsString = `?imwidth=${width}&quality=${quality || 75}`;
  return `${src}${paramsString}`;
};
