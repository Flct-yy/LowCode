import React, { useRef, useLayoutEffect } from 'react';
import './RightClickMenu.scss';

const RightClickMenu: React.FC<{ exLeft?: number,exTop?: number, children?: React.ReactNode }> = ({ exLeft,exTop, children }) => {
  // 获取菜单元素
  const contextMenu = useRef<HTMLDivElement>(null);
  const targetArea = useRef<HTMLDivElement>(null);
  const menuItems = [
    { id: 'copy', label: '复制',rightLabel:'Ctrl+C' },
    { id: 'paste', label: '粘贴',rightLabel:'Ctrl+V' },
    { id: 'delete', label: '删除',rightLabel:'Del' },
    { id: 'reset', label: '重置',rightLabel:'Ctrl+R' },
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
            console.log('复制');
            break;
          case 'paste':
            console.log('粘贴');
            break;
          case 'delete':
            console.log('删除');
            break;
          case 'reset':
            console.log('重置');
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
  }, [exLeft,exTop]);

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
