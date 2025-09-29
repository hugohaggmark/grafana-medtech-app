import { PanelPlugin } from '@grafana/data';
import { PanelOptions } from './types';
import { MedTechPanel } from './components/MedtechPanel';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(MedTechPanel);
