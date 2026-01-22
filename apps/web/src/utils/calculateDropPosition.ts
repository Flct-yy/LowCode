import { findNode, ComponentSchema, ConfigItemFieldEnum } from '@wect/type';
import { XYCoord } from 'react-dnd';
import React from 'react';


const calculateDropPosition = (componentRef: React.RefObject<HTMLDivElement | null>, curCom: ComponentSchema|undefined, clientOffset: XYCoord | null) => {
  if (!curCom || !clientOffset) {
    return {
      goalID: -1,
      parChIndex: -1
    }
  }
  let goalID = curCom.comSchemaId;
  let parChIndex = -1;
  const parentCom = findNode(curCom.parentId);
  if (parentCom) {
    // 获取拖拽位置信息
    const dropRect = componentRef.current?.getBoundingClientRect();
    // 基于位置的放置策略：中心区域放当前组件，边缘区域放父组件
    if (clientOffset && dropRect) {
      const relativeX = clientOffset.x - dropRect.left;
      const relativeY = clientOffset.y - dropRect.top;
      const dropZoneWidth = dropRect.width;
      const dropZoneHeight = dropRect.height;

      // 定义区域划分：
      // - 垂直方向：顶部1/5和底部1/5区域
      // - 水平方向：左侧1/5和右侧1/5区域
      // 边缘区域（任意边缘方向）放置到父组件，中心区域放置到当前组件
      // 调整为1/5的边缘区域，使中心区域更大，更容易将组件拖到当前容器中
      const topZone = dropZoneHeight / 5;
      const bottomZone = dropZoneHeight * 4 / 5;
      const leftZone = dropZoneWidth / 5;
      const rightZone = dropZoneWidth * 4 / 5;

      // 判断是否在边缘区域
      const isInVerticalEdge = relativeY < topZone || relativeY > bottomZone;
      const isInHorizontalEdge = relativeX < leftZone || relativeX > rightZone;

      // 如果在任意边缘区域，放置到父组件
      if (isInVerticalEdge || isInHorizontalEdge) {
        let direction = 'row';

        goalID = parentCom.comSchemaId;
        parChIndex = parentCom.children.findIndex(child => child.comSchemaId === curCom.comSchemaId);

        parentCom.config?.forEach((item, index) => {
          item.configItem.forEach((configItem) => {
            if (configItem.field === ConfigItemFieldEnum.flexDirection) {
              direction = configItem.currentValue as string;
            }
          })
        })
        if (direction === 'row') {
          if (relativeX > rightZone) {
            parChIndex += 1;
          }
        } else {
          if (relativeY > bottomZone) {
            parChIndex += 1;
          }
        }
      }
      // 否则（中心区域），放置到当前组件
    }
  }
  return {
    goalID,
    parChIndex
  }
}

export default calculateDropPosition;