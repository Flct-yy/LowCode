import React from 'react';
import { ComponentSchema } from '@/type/ComponentSchema';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import './ComponentPreview.scss';


const ComponentPreview: React.FC<{ compSchema: ComponentSchema }> = ({ compSchema }) => {
  const {state, actions} = useWebsContext();
  const {selectedComponentId} = state;
  console.log(selectedComponentId, compSchema.comSchemaId);
  return (
    <div className={`component-preview ${selectedComponentId === compSchema.comSchemaId ? 'component-preview--selected' : ''}`} style={{
      position: compSchema.position.position,
      left: compSchema.position.x,
      top: compSchema.position.y,
    }} onMouseDown={() => actions.edit_select_com(compSchema.comSchemaId)}>
      <div className="component-preview__content">
        
        <div className="component-preview__title">{compSchema.comSchemaId}</div>
      </div>
    </div>
  );
};

export default ComponentPreview;