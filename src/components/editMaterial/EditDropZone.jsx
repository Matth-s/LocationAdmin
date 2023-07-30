import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ setFiles, files }) => {
  useEffect(() => {
    const filesWithFilePath = files.map((file) => {
      const fileObject = new File([file], file, { type: "image/jpeg" });
      fileObject.path = file;
      fileObject.preview = file;
      return fileObject;
    });

    setFiles(filesWithFilePath);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
  });

  const handleRemoveImage = (id) => {
    const newFiles = files.filter((file) => file.path !== id);
    setFiles(newFiles);
  };

  const thumbs = files.map((file, index) => (
    <div
      className="thumbs-container flex flex__column flex__spaceBtw"
      key={index}
    >
      <div className="thumbs-header flex">
        <img
          className="icon-close"
          onClick={() => handleRemoveImage(file.path)}
          src="../assets/close.png"
          alt="close"
        />
        <p onClick={() => console.log(file)}>Image de présentation</p>
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
          <p className="select-image">Sélectionnez les images</p>
        </div>
        {files.length > 0 && <aside>{thumbs}</aside>}
      </section>
    </div>
  );
};

export default DropZone;
