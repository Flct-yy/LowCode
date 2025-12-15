import React from "react";
import { TreeDataNode } from "antd"
import { CarryOutOutlined } from '@ant-design/icons';
import { ComponentSchema } from "@/type/ComponentSchema";

const getComTreeNode = (comSchema: ComponentSchema): TreeDataNode => {
  return {
    title: `${comSchema.metadata.componentName}(${comSchema.comSchemaId})`,
    key: comSchema.comSchemaId,
    icon: React.createElement(CarryOutOutlined),
    children: comSchema.children.map(child => getComTreeNode(child)),
  }
}

const generateComTree = (comRoot: ComponentSchema): TreeDataNode[] => {
  const treeData: TreeDataNode[] = [];
  treeData.push(getComTreeNode(comRoot));
  return treeData;
}

export default generateComTree;