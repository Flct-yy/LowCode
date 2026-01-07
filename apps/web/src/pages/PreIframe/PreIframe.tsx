import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PreIframe: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const previewUrl = useMemo(() => {
    if (!pageId) {
      navigate('/lists');
    }
    return `http://localhost:5174/preview/${pageId}`;
  }, [pageId]);
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