import React from 'react';
import { ComponentSchema } from '@/type/ComponentSchema';


const ComponentPreview: React.FC<{ compSchema: ComponentSchema }> = ({ compSchema }) => {
  return (
    <div className="component-preview" style={{
      position: 'absolute',
      left: compSchema.position.x,
      top: compSchema.position.y,
      width: compSchema.position.width,
      height: compSchema.position.height,
    }}>
      <div className="component-preview__content">
        <div className="component-preview__title">{compSchema.comSchemaId}</div>
      </div>
    </div>
  );
};

export default ComponentPreview;