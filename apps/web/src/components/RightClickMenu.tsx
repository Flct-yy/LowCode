import React, { useRef, useLayoutEffect, useContext } from 'react';
import './RightClickMenu.scss';
import { message } from 'antd';
import useWebsContext from '@/context/WebsContext/useWebsContext';
import renderCopyComNewID from '@/utils/renderCopyComNewID';
import { AspectRatioEnum } from '@/type/PageModel';


const RightClickMenu: React.FC<{ exLeft?: number, exTop?: number, children?: React.ReactNode }> = ({ exLeft, exTop, children }) => {
  const { state, actions } = useWebsContext();
  const { comTree, selectedComponentId, copyComponent } = state;
  // 获取菜单元素
  const contextMenu = useRef<HTMLDivElement>(null);
  const targetArea = useRef<HTMLDivElement>(null);
  const menuItems = [
    { id: 'copy', label: '复制', rightLabel: 'Ctrl+C' },
    { id: 'paste', label: '粘贴', rightLabel: 'Ctrl+V' },
    { id: 'delete', label: '删除', rightLabel: 'Del' },
    { id: 'reset', label: '重置', rightLabel: 'Ctrl+R' },
  ];


  useLayoutEffect(() => {
    // 阻止默认右键菜单
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  }, []);

  useLayoutEffect(() => {
    const menuElement = contextMenu.current;
    const areaElement = targetArea.current;

    if (!menuElement || !areaElement) return;

    // 监听目标区域的右键点击事件
    const handleAreaContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      // 计算菜单位置
      let left = e.clientX;
      let top = e.clientY;
      if (exLeft) {
        left = e.clientX - exLeft;
      }
      if (exTop) {
        top = e.clientY - exTop;
      }

      // 确保菜单不会超出窗口
      if (left + menuElement.offsetWidth > window.innerWidth) {
        left = window.innerWidth - menuElement.offsetWidth;
      }
      if (top + menuElement.offsetHeight > window.innerHeight) {
        top = window.innerHeight - menuElement.offsetHeight;
      }

      // 显示菜单
      menuElement.style.left = left + 'px';
      menuElement.style.top = top + 'px';
      menuElement.style.display = 'block';
    };

    // 点击其他区域隐藏菜单
    const handleClickOutside = () => {
      menuElement.style.display = 'none';
    };

    // 菜单点击事件处理
    const handleMenuClick = (e: MouseEvent) => {
      const menuItem = e.target as HTMLLIElement;
      if (menuItem.tagName === 'LI') {
        // 根据菜单ID执行不同操作
        switch (menuItem.id) {
          case 'copy':
            try {
              if (selectedComponentId === comTree.getRoot().comSchemaId) {
                message.error('不能复制根组件');
                return;
              }
              if (selectedComponentId !== -1) {
                const comSchema = comTree.findNode(selectedComponentId!);
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
            break;
          case 'paste':
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
            break;
          case 'delete':
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
              console.log('删除组件ID:', selectedComponentId);
              message.success('删除组件成功');
            } catch (error) {
              console.error('删除组件失败:', error);
              message.error('删除组件失败');
            }
            break;
          case 'reset':
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
            break;
        }
        // 隐藏菜单
        menuElement.style.display = 'none';
      }
    };

    // 添加事件监听器
    areaElement.addEventListener('contextmenu', handleAreaContextMenu);
    window.addEventListener('click', handleClickOutside);
    menuElement.addEventListener('click', handleMenuClick);

    // 清理事件监听器
    return () => {
      areaElement.removeEventListener('contextmenu', handleAreaContextMenu);
      window.removeEventListener('click', handleClickOutside);
      menuElement.removeEventListener('click', handleMenuClick);
    };
  }, [exLeft, exTop,selectedComponentId,copyComponent]);

  return (
    <>
      <div ref={contextMenu} id="clickMenu" className="click-menu">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} id={item.id}>
              {item.label}
              <span className="right-label">{item.rightLabel}</span>
            </li>
          ))}
        </ul>
      </div>
      <div ref={targetArea} id="targetArea" className="target-area">
        {children}
      </div>
    </>
  );
};

export default RightClickMenu;
