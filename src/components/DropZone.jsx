import React from "react";

import { useDropzone } from "react-dropzone";

const DropZone = ({ setFiles, files, setImageMain }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleRomveImage = (id) => {
    const newFiles = files.filter((file) => file.path !== id);
    setFiles(newFiles);
  };

  const presentationImage = (file) => {
    setImageMain(file);
  };

  const thumbs = files.map((file) => (
    <div
      className="thumbs-container flex flex__column flex__spaceBtw"
      key={file.name}
    >
      <div className="thumbs-header flex">
        <img
          className="icon-close"
          onClick={() => handleRomveImage(file.path)}
          src="./assets/close.png"
          alt="close"
        />
        <p onClick={() => presentationImage(file)}>Image de presentation</p>
      </div>
      <div className="thumbs-div">
        <img
          alt="selection"
          src={file.preview}
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    </div>
  ));

  return (
    <div className="dropzone-container">
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="select-image">Selectionnez les images</p>
        </div>
        {files.length > 0 && <aside>{thumbs}</aside>}
      </section>
    </div>
  );
};

export default DropZone;
