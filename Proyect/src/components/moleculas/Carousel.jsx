import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

function Carousel({ children }) {
  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));

  return (
    <div className="relative w-3/4 h-3/5 overflow-hidden">
      <div
        className="flex   h-full justify-center items-center absolute transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 33}%)` }}
      >
        {children}
      </div>
      <div className="absolute inset-0 flex justify-between items-center ">
        <button onClick={prev} className="styleButtons">
          <ChevronLeft size={40} />
        </button>
        <button onClick={next} className="styleButtons">
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-1 right-0 left-0 ">
        <div className="flex items-center justify-center gap-2">
          {children.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-slate-600 rounded-full ${
                curr === i ? "p-2" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
