import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './preIframe.scss';

const PreIframe: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  const previewUrl = useMemo(() => {
    if (!pageId) {
      navigate('/lists');
    }
    return `http://localhost:5174/preview/${pageId}`;
  }, [pageId]);
  return (
    <div className='preIframe-container'>
      <div className='preIframe-back' onClick={handleBack}>返回</div>
      <iframe
        src={previewUrl}
        className='preIframe-content'
        title="preIframe"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
};

export default PreIframe;