import React, { useEffect } from 'react';
import useWebsContext from '@context/WebsContext/useWebsContext';
import { AspectRatioEnum } from '@/type/PageModel';
import renderCopyComNewID from '@/utils/renderCopyComNewID';
import { message } from 'antd';

const ShortcutManager = () => {
  const { state, actions } = useWebsContext();
  const { comTree, selectedComponentId, copyComponent } = state;
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
            // 在删除前获取父组件ID
            const componentToDelete = state.comTree.findNode(selectedComponentId!);
            if (componentToDelete) {
              const parentId = componentToDelete.parentId;
              actions.remove_component(selectedComponentId!);
              // 选择父组件
              actions.edit_select_com(parentId);
            }
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
        // 这里调用你的复制逻辑
        try {
          if (selectedComponentId === comTree.getRoot().comSchemaId) {
            message.error('不能复制根组件');
            return;
          }
          if (selectedComponentId !== -1) {
            const comSchema = state.comTree.findNode(selectedComponentId!);
            if (comSchema) {
              actions.copy_component(comSchema);
            } else {
              message.error('未选中任何组件');
            }
            message.success('复制组件成功');
          }
        } catch (error) {
          console.error('复制组件失败:', error);
          message.error('复制组件失败');
        }
      }

      // Ctrl/Cmd + V: 粘贴
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        // 这里调用你的粘贴逻辑
        try {
          if (copyComponent) {
            // 为粘贴的组件生成新的唯一ID
            const newComponent = renderCopyComNewID(copyComponent);
            actions.add_component(newComponent, selectedComponentId!, -1);
          } else {
            message.error('未复制任何组件');
          }
          message.success('粘贴组件成功');
        } catch (error) {
          console.error('粘贴组件失败:', error);
          message.error('粘贴组件失败');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copyComponent, selectedComponentId]);
  return null;
};

export default ShortcutManager;