import { type ComponentSchema, ComponentTypeEnum, ComponentCategoryEnum } from '@type/ComponentSchema';
import { ConfigAreaEnum, ConfigItemFieldEnum } from '@type/Config';
import { UiTypeEnum } from '@type/ConfigItem';
/**
 * ComponentSchema 树结构的 CRUD 实现
 */
class ComTree {
  root: ComponentSchema
  constructor() {
    // 根节点（默认根节点 id 为 0，可根据需求调整）
    this.root = {
      comSchemaId: new Date().getTime(),
      metadata: {
        componentId: 0,
        componentName: '根节点',
        componentType: ComponentTypeEnum.ROOT,
        category: ComponentCategoryEnum.ROOT,
        tags: [],
        version: '1.0.0',
      },
      position: {
        x: 0,
        y: 0,
        position: 'static',
      },
      config: [],
      children: [],
      parentId: -1,
      isLocked: false,
      isVisible: true,
    };
  }

  // 递归查找节点（核心辅助方法）
  findNode(targetId: number, node = this.root): ComponentSchema | undefined {
    // 找到目标节点，直接返回
    if (node.comSchemaId === targetId) {
      return node;
    }

    // 遍历子节点递归查找
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const found = this.findNode(targetId, child);
        if (found) return found;
      }
    }

    // 未找到
    return undefined;
  }

  // 添加子节点
  addNode(newNode: ComponentSchema, parentId: number) {
    if (!newNode.comSchemaId || !newNode.metadata.componentName) {
      console.error('新节点必须包含 comSchemaId 和 metadata.componentName 属性');
      return false;
    }

    // 查找父节点
    const parentNode = this.findNode(parentId);
    if (!parentNode) {
      console.error(`父节点 ${parentId} 不存在`);
      return false;
    }

    // 校验子节点 ID 唯一性
    // 在 main.tsx 中启用了 React.StrictMode ，这会导致组件在开发模式下进行双重渲染，包括 useDrop 钩子的设置和事件处理函数。 所以会暂时报错
    if (this.findNode(newNode.comSchemaId)) {
      console.error(`节点 ID ${newNode.comSchemaId} 已存在`);
      return false;
    }
    // 初始化 children（防止传入的新节点没有 children 属性）
    newNode.children = newNode.children || [];
    // 添加子节点
    parentNode.children.push(newNode);
    return true;
  }

  // 删除节点（包含其子节点）
  removeNode(targetId: number) {

    // 查找节点
    const currentNode = this.findNode(targetId);
    if (!currentNode) {
      console.error(`节点 ${targetId} 不存在`);
      return false;
    }
    // 查找父节点
    const parentNode = this.findNode(currentNode.parentId);
    if (!parentNode) {
      console.error(`节点 ${targetId} 的父节点不存在`);
      return false;
    }

    // 过滤掉要删除的节点
    parentNode.children = parentNode.children.filter(node => node.comSchemaId !== currentNode.comSchemaId);
    return true;
  }

  // 更新节点配置
  updateNodeConfig(targetId: number, areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentValue: string) {
    const targetNode = this.findNode(targetId);
    if (!targetNode) {
      console.error(`节点 ${targetId} 不存在`);
      return false;
    }

    const configArea = targetNode.config.find(area => area.areaName === areaName);
    if (!configArea) {
      console.error(`节点 ${targetId} 不存在配置区域 ${areaName}`);
      return false;
    }

    const configItem = configArea.configItem.find(item => item.field === field);
    if (!configItem) {
      console.error(`节点 ${targetId} 不存在配置项 ${field}`);
      return false;
    }
    configItem.currentValue = currentValue;
    return true;
  }
  // 更新节点单位
  updateNodeUnit(targetId: number, areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentUnit: string) {
    const targetNode = this.findNode(targetId);
    if (!targetNode) {
      console.error(`节点 ${targetId} 不存在`);
      return false;
    }
    const configArea = targetNode.config.find(area => area.areaName === areaName);
    if (!configArea) {
      console.error(`节点 ${targetId} 不存在配置区域 ${areaName}`);
      return false;
    }
    const configItem = configArea.configItem.find(item => item.field === field);
    if (!configItem) {
      console.error(`节点 ${targetId} 不存在配置项 ${field}`);
      return false;
    }
    if (configItem.uiType === UiTypeEnum.INPUT_NUMBER) {
      configItem.currentUnit = currentUnit;
    }
    return true;
  }

  // 遍历树（前序遍历）添加组件预览
  // traverse(callback: (node: ComponentSchema) => React.ReactNode, node = this.root) {
  //   if (!node) return [];
  //   const result = [callback(node)];
  //   if (node.children && node.children.length > 0) {
  //     node.children.forEach(child => {
  //       result.push(...this.traverse(callback, child));
  //     });
  //   }
  //   return result;
  // }

  // 打印树形结构（辅助方法，便于调试）
  printTree(node = this.root, level = 0) {
    const indent = '  '.repeat(level);
    console.log(`${indent}├── ${node.comSchemaId} - ${node.metadata.componentName}`);
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => this.printTree(child, level + 1));
    }
  }
}

export default ComTree;