import React from 'react';
import useWebsContext from '@context/WebsContext/useWebsContext';

const PreIframe: React.FC = () => {
  const { state } = useWebsContext();
  const { metadata } = state;

  const previewUrl = `http://localhost:5174/preview?pageId=${metadata.id}`;
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={previewUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="preIframe"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default PreIframe;