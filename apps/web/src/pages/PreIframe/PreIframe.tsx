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
    //TODO
    // if (!pageId) {
    //   navigate('/lists');
    // }
    // ${import.meta.env.VITE_PREVIEW_URL}${pageId}
    return `${import.meta.env.VITE_PREVIEW_URL}`;
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