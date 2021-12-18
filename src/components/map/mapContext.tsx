import { createContext, useRef, useState } from "react";
export const Context = createContext<any>(null);

export const MapContext = ({ children }: any) => {
  const [activeCard, setActiveCard] = useState<any>(0);
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const [swiper, setSwiper] = useState<any>(null);
  return (
    <Context.Provider
      value={{
        ref0,
        ref1,
        ref2,
        ref3,
        ref4,
        ref5,
        ref6,
        ref7,
        ref8,
        ref9,
        activeCard,
        setActiveCard,
        swiper,
        setSwiper
      }}
    >
      {children}
    </Context.Provider>
  );
};
