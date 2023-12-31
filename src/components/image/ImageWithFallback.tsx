import React, { useState } from 'react';

import Image from 'next/image';
import { Sativa } from '@/public/assets/icons/iconComponents';

const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, alt, objectFit, ...rest } = props;
  const [imgStatus, setImgStatus] = useState(true);

  return (
    <div className="">
      {imgStatus && src ? (
        <Image
          {...rest}
          src={`${src}`}
          onError={() => {
            setImgStatus(fallbackSrc);
          }}
          className="w-full"
          alt={alt}
          layout="fill"
          objectFit={objectFit ? objectFit : 'cover'}
        />
      ) : (
        <div className=" absolute w-full h-full bg-gray-200 z-0">
          <Sativa fill="black" opacity={0.2} className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
