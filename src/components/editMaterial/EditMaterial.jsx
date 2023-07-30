import React, { useState } from "react";
import EditMaterialInformation from "./EditMaterialInformation";
import EditDropZone from "./EditDropZone";

const EditMaterial = ({ data, setEdit }) => {
  const [files, setFiles] = useState(data.images);

  return (
    <div className="editMaterial-container flex flex__spaceAround">
      <EditDropZone files={files} setFiles={setFiles} />
      <EditMaterialInformation data={data} setEdit={setEdit} files={files} />
    </div>
  );
};

export default EditMaterial;
