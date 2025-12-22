import React from "react";
import { TreeDataNode } from "antd"
import { CarryOutOutlined } from '@ant-design/icons';
import { ComponentSchema } from "@/type/ComponentSchema";

// 生成组件树视图节点
const getComTreeNode = (comSchema: ComponentSchema): TreeDataNode => {
  
  // 添加防御性检查，避免undefined访问错误
  if (!comSchema) {
    console.error('comSchema is undefined');
    return {
      title: '未定义节点',
      key: 'undefined',
      children: [],
    };
  }
  if (!comSchema.metadata) {
    console.error('comSchema.metadata is undefined');
    return {
      title: `未定义组件(${comSchema.comSchemaId || 'undefined'})`,
      key: comSchema.comSchemaId || 'undefined',
      icon: React.createElement(CarryOutOutlined),
      children: [],
    };
  }
  if (!comSchema.metadata.componentName) {
    console.error('comSchema.metadata.componentName is undefined');
  }
  return {
    title: `${comSchema.metadata.componentName || '未命名'}(${comSchema.comSchemaId})`,
    key: comSchema.comSchemaId,
    icon: React.createElement(CarryOutOutlined),
    children: (comSchema.children || []).map(child => getComTreeNode(child)),
  };
}

const generateComTree = (comRoot: ComponentSchema): TreeDataNode[] => {
  const treeData: TreeDataNode[] = [];
  // 添加防御性检查，避免undefined访问错误
  if (comRoot) {
    treeData.push(getComTreeNode(comRoot));
  }
  return treeData;
}

export default generateComTree;