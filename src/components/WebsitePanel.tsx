import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { WebsitePanelOptions } from '../module';
import { css } from '@emotion/css';

interface Props extends PanelProps<WebsitePanelOptions> {}

export const WebsitePanel: React.FC<Props> = ({ options, width, height }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { url, refreshRate } = options;

  useEffect(() => {
    if (refreshRate > 0) {
      const interval = setInterval(() => {
        if (iframeRef.current) {
          iframeRef.current.src = url;
        }
      }, refreshRate * 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [url, refreshRate]);

  const styles = {
    wrapper: css`
      width: ${options.width};
      height: ${options.height};
      position: relative;
    `,
    iframe: css`
      width: 100%;
      height: 100%;
      border: none;
      position: absolute;
      top: 0;
      left: 0;
    `,
  };

  return (
    <div className={styles.wrapper}>
      <iframe
        ref={iframeRef}
        src={url}
        className={styles.iframe}
        title="External Website"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};
// 添加一个换行符
