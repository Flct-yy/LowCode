import React from 'react';

const PreIframe: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="http://localhost:5174/preview"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="preIframe"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default PreIframe;