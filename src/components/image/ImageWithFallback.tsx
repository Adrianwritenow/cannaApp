import React, { useState } from 'react';

import Image from 'next/image';
import { Sativa } from '@/public/assets/icons/iconComponents';

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgStatus, setImgStatus] = useState(true);

  return (
    <>
      {imgStatus && src ? (
        <Image
          {...rest}
          src={`${src}`}
          onError={() => {
            setImgStatus(fallbackSrc);
          }}
          alt={alt}
        />
      ) : (
        <div className="absolute w-full relative h-full bg-gray-200 z-0">
          <Sativa fill="black" opacity={0.2} className="w-full h-full" />
        </div>
      )}
    </>
  );
};

export default ImageWithFallback;
