import { PanelPlugin } from '@grafana/data';
import { WebsitePanel } from './components/WebsitePanel';

export interface WebsitePanelOptions {
  url: string;
  height: string;
  width: string;
  refreshRate: number;
}

export const plugin = new PanelPlugin<WebsitePanelOptions>(WebsitePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'url',
      name: 'Website URL',
      description: 'Enter the URL of the website to embed',
      defaultValue: 'https://grafana.com',
    })
    .addTextInput({
      path: 'height',
      name: 'Height',
      description: 'Height of the iframe (e.g., 100%, 500px)',
      defaultValue: '100%',
    })
    .addTextInput({
      path: 'width',
      name: 'Width',
      description: 'Width of the iframe (e.g., 100%, 800px)',
      defaultValue: '100%',
    })
    .addNumberInput({
      path: 'refreshRate',
      name: 'Refresh Rate',
      description: 'Refresh rate in seconds (0 for no refresh)',
      defaultValue: 0,
    });
});
// 添加一个换行符
