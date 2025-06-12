"use client";
import { Fragment, useEffect, useState } from "react";

const ImgViews = ({ close, src }) => {
  return (
    <Fragment>
      <div
        className="mfp-bg"
        onClick={close}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
        }}
      ></div>
      <div
        className="mfp-wrap"
        onClick={close}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={src}
          alt="Popup"
          style={{
            maxWidth: "200vw",
            maxHeight: "200vh",
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
          }}
        />
      </div>
    </Fragment>
  );
};

const ImageView = () => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const isImage = /\.(png|jpe?g|webp|gif|svg)$/i.test(href);
      if (!isImage) return;

      e.preventDefault();
      setImgSrc(href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>{imgSrc && <ImgViews src={imgSrc} close={() => setImgSrc(null)} />}</>
  );
};

export default ImageView;
