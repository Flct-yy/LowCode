import React from 'react';
import { Empty } from 'antd';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { ComponentSchema } from '@/type/ComponentSchema';

const Editor: React.FC = () => {
  const { state, actions } = useWebsContext();
  const { selectedComponentId } = state;
  const selectedComponent: ComponentSchema | undefined = state.components.find((component: ComponentSchema) => component.comSchemaId === selectedComponentId);


  return (
    <div style={{ padding: '20px' }}>
      {selectedComponentId !== -1 ? (
        <div>
          <div>
            组件：{selectedComponent?.metadata?.componentType}
          </div>
        </div>
      ) : (
        <Empty description="请选择组件" />
      )}
    </div>
  );
}

export default Editor;