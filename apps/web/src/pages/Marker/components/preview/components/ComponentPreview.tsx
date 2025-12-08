import React, { useEffect } from 'react';
import { type ComponentSchema } from '@type/ComponentSchema';
import convertConfigToStyle from '@utils/convertConfigToStyle';
import getConfigText from '@utils/getConfigText';

import useWebsContext from '@/context/WebsContext/useWebsContext';
import './ComponentPreview.scss';


const ComponentPreview: React.FC<{ compSchema: ComponentSchema }> = ({ compSchema }) => {
  const { state, actions } = useWebsContext();
  const { selectedComponentId } = state;

  const style = convertConfigToStyle(compSchema.config);

  useEffect(() => {
    const style = convertConfigToStyle(compSchema.config);
  }, [compSchema.config]);

  const text = getConfigText(compSchema.config);
  console.log(text);


  return (
    <div className={`component-preview ${selectedComponentId === compSchema.comSchemaId ? 'component-preview--selected' : ''}`} style={{
      position: compSchema.position.position,
      left: compSchema.position.x,
      top: compSchema.position.y,
    }} onMouseDown={() => actions.edit_select_com(compSchema.comSchemaId)}>
      <div className="component-preview__text" style={style}>{text}</div>
    </div>
  );
};

export default ComponentPreview;