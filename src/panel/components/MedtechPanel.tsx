import React, { useRef } from 'react';
import dicomts, { Renderer } from 'dicom.ts';
import DICOMCanvas from './DICOMCanvas';
import FileInput from './FileInput';

let renderer: Renderer;

export function MedTechPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fileSelected = (buff: ArrayBuffer, name: string) => {
    console.time(`parse ${name}`);
    console.time(`render ${name}`);
    const image = dicomts.parseImage(buff);
    console.timeEnd(`parse ${name}`);
    if (!renderer || renderer.canvas !== canvasRef.current) {
      renderer = new Renderer(canvasRef.current);
    }
    renderer.render(image!, 0).then(() => {
      console.timeEnd(`render ${name}`);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        Select file:
        <FileInput onFileSelected={fileSelected} />
        <div style={{ height: '50px' }} />
        <DICOMCanvas id="dicom-canvas" canvasRef={canvasRef} width={512} height={512} />
      </header>
    </div>
  );
}
