import React, { useState, useRef } from "react";

const Carrousel = ({ data }) => {
  const [img, setImg] = useState(data[0]);

  const hoverHandler = (image, i) => {
    setImg(image);
  };

  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div className="carrousel-container">
      <div className="left">
        <div className="left_1">
          {data.map((image, i) => (
            <div
              className={image === img ? "img_wrap active" : "img_wrap "}
              key={i}
              onMouseOver={() => hoverHandler(image, i)}
              ref={addRefs}
            >
              <img src={image} alt={image} />
            </div>
          ))}
        </div>
        <div className="left_2">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
