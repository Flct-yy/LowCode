import React, { useMemo } from "react";
import ConfigComArea from './components/configComArea';
import PageConfig from './components/pageConfig';
import { type ComponentSchema } from '@wect/type';
import { type TotesConfig } from '@wect/type';
import { Empty } from 'antd';
import useWebsContext from "@/context/WebsContext/useWebsContext";
import { ComTree } from "@wect/type";

const ComConfig: React.FC = () => {

  const { state } = useWebsContext();
  const { comTree, metadata, selectedComponentId } = state;
  const selectedComponent: ComponentSchema | undefined = comTree.findNode(selectedComponentId!);
  // 如果selectedComponent为undefined，显示空状态
  if (!selectedComponent) {
    return <Empty description="请选择组件" />;
  }

  return useMemo(() => (
    <div>
      <div className='config-com-info'>
        <div className='config-com-info__item'>
          组件：{selectedComponent.metadata?.componentType || '未定义'}
        </div>
        <div className='config-com-info__item'>
          {selectedComponent.metadata?.description || '无描述'}
        </div>
      </div>
      {
        selectedComponent.comSchemaId !== ComTree.getRoot().comSchemaId ?
          (selectedComponent.config || []).map((item: TotesConfig, index: number) => (
            <ConfigComArea key={item.areaName || index.toString()} config={item} />
          )) :
          (
            <PageConfig metadata={metadata} />
          )
      }
    </div>
  ), [selectedComponent])
}
export default ComConfig;