import React from "react";

const DICOMCanvas = ({
  id = "dicom-canvas",
  canvasRef,
  width = 512,
  height = 512,
}) => (
  <canvas
    ref={canvasRef}
    id={id}
    style={{ width: `${width}px`, height: `${height}px` }}
  />
);

export default DICOMCanvas;
