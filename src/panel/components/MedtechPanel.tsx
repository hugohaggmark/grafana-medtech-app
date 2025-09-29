import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions } from 'panel/types';
import { RenderingEngine, Enums, init as coreInit } from '@cornerstonejs/core';
import { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';
import createImageIdsAndCacheMetaData from '../helpers/createImageIdsAndCacheMetaData';

/**
 * Runs the demo
 */
async function run(element: HTMLDivElement) {
  await coreInit();
  await dicomImageLoaderInit();

  // Get Cornerstone imageIds and fetch metadata into RAM
  const imageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
    SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
    wadoRsRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
  });

  const renderingEngineId = 'myRenderingEngine';
  const renderingEngine = new RenderingEngine(renderingEngineId);

  const viewportId = 'CT_AXIAL_STACK';

  const viewportInput = {
    viewportId,
    element,
    type: Enums.ViewportType.STACK,
  };

  renderingEngine.enableElement(viewportInput);

  const viewport = renderingEngine.getViewport(viewportId);

  // viewport.setDataIds(imageIds);
  // @ts-expect-error not typed
  await viewport.setStack(imageIds);

  // renderingEngine.renderViewport(viewport.id);
  viewport.render();
}

export const MedTechPanel: React.FC<PanelProps<PanelOptions>> = ({ height, width }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      run(elementRef.current);
    }
  }, []);

  return (
    <>
      <div ref={elementRef} style={{ width, height, backgroundColor: 'red' }} />
    </>
  );
};
