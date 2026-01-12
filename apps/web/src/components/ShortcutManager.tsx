import React, { useEffect } from 'react';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { AspectRatioEnum } from '@/type/PageModel';
import { message } from 'antd';

const ShortcutManager = () => {
  const { state, actions } = useWebsContext();
  const { comTree, selectedComponentId } = state;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Y: 画布重新放置
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        // 这里调用你的画布重新放置逻辑
        try {
          actions.edit_zoom_ratio(1);
          actions.edit_aspect_ratio(AspectRatioEnum.RATIO_16_9);
          actions.edit_preview_scroll(0, 0);
          message.success('画布重新放置成功');
        } catch (error) {
          console.error('画布重新放置失败:', error);
          message.error('画布重新放置失败');
          return;
        }
      }

      // Delete: 删除选中组件
      if (e.key === 'Delete') {
        e.preventDefault();
        // 这里调用你的删除逻辑
        try {
          if (selectedComponentId !== -1) {
            if (selectedComponentId === comTree.getRoot().comSchemaId) {
              message.error('不能删除根组件');
              return;
            }
            console.log(selectedComponentId);
            actions.remove_component(selectedComponentId!);
            const comSchemaId = state.comTree.findNode(selectedComponentId!)?.parentId;
            actions.edit_select_com(comSchemaId as number);
          }
          message.success('删除组件成功');
        } catch (error) {
          console.error('删除组件失败:', error);
          message.error('删除组件失败');
        }
      }

      // Ctrl/Cmd + C: 复制
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        console.log('复制选中组件');
        // 这里调用你的复制逻辑
      }

      // Ctrl/Cmd + V: 粘贴
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        console.log('粘贴组件');
        // 这里调用你的粘贴逻辑
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentId]);
  return null;
};

export default ShortcutManager;