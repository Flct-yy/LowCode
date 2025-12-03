import React from 'react';
import { Empty } from 'antd';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { type ComponentSchema } from '@/type/ComponentSchema';
import { type TotesConfig } from '@/type/Config';
import ConfigComArea from './components/configComArea';
import './editor.scss';

const Editor: React.FC = () => {
  const { state, actions } = useWebsContext();
  const { selectedComponentId } = state;
  const selectedComponent: ComponentSchema | undefined = state.components.find((component: ComponentSchema) => component.comSchemaId === selectedComponentId);


  return (
    <div className='editor'>
      {selectedComponentId !== -1 ? (
        <div>
          <div>
            组件：{selectedComponent?.metadata?.componentType}
          </div>
          <div>
            组件ID：{selectedComponent?.comSchemaId}
          </div>
          {
            selectedComponent?.config.map((item: TotesConfig,index: number) => (
              <ConfigComArea key={item.areaName || index.toString()} config={item} />
            ))
          }
        </div>
      ) : (
        <Empty description="请选择组件" />
      )}
    </div>
  );
}

export default Editor;