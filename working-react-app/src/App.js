import React, { useRef } from "react";
import dicomts, { Renderer } from "dicom.ts";
import FileInput from "./components/FileInput";
import DICOMCanvas from "./components/DICOMCanvas";
import "./App.css";

let renderer;

function App() {
  const canvasRef = useRef(null);

  const fileSelected = (buff, name) => {
    console.time(`parse ${name}`);
    console.time(`render ${name}`);
    const image = dicomts.parseImage(new DataView(buff));
    console.timeEnd(`parse ${name}`);
    if (!renderer || renderer.canvas !== canvasRef.current) {
      renderer = new Renderer(canvasRef.current);
    }
    renderer.render(image, 0).then(() => {
      console.timeEnd(`render ${name}`);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        Select file:
        <FileInput onFileSelected={fileSelected} />
        <div style={{ height: "50px" }} />
        <DICOMCanvas
          id="dicom-canvas"
          canvasRef={canvasRef}
          width={512}
          height={512}
        />
      </header>
    </div>
  );
}

export default App;
