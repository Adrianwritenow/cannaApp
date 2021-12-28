import { useEffect, useState } from 'react';

const getWidth = () => {
  if (typeof window !== 'undefined') {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
};
export function useCurrentWidth() {
  let [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId: any = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 500);
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return width;
}
