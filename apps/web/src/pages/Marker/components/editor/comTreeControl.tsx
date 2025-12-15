import React from 'react';
import { Tree } from 'antd';
import ComTree from '@/type/ComTree';
import generateComTree from '@/utils/generateComTree';

import type { TreeProps } from 'antd';


const ComTreeControl = ({ selectedComponentId, comTree, onSelect, onDragDrop }: { selectedComponentId: number, comTree: ComTree, onSelect: (compActiveIndex: number) => void, onDragDrop: (sourceId: number, targetParentId: number, childrenIndex: number) => void }) => {
  const TreeData = generateComTree(comTree.root);
  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    if (info.selected) {
      onSelect(Number(selectedKeys[0]));
    }
  };

  // 放置
  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropNode = comTree.findNode(Number(info.node.key));
    if (!dropNode) {
      console.error(`目标节点 ${info.node.key} 不存在`);
      return;
    }
    if (dropNode.comSchemaId === comTree.root.comSchemaId) {
      console.error(`根节点保持唯一`);
      return;
    }
    onDragDrop(Number(info.dragNode.key), dropNode.parentId, info.dropPosition || 0);
  };

  return (
    <div className='com-tree'>
      <Tree
        showLine={true}
        draggable
        blockNode
        defaultExpandAll={true}
        onSelect={handleSelect}
        onDrop={onDrop}
        treeData={TreeData}
      />
    </div>
  )
}
export default ComTreeControl;