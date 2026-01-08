import { type ComponentSchema, ComponentTypeEnum, ComponentCategoryEnum } from './ComponentSchema';
import { ConfigAreaEnum, ConfigItemFieldEnum } from './Config';
import { UiTypeEnum } from './ConfigItem';

const defaultRoot: ComponentSchema = {
  comSchemaId: new Date().getTime(),
  metadata: {
    componentId: 0,
    componentName: '根节点',
    componentType: ComponentTypeEnum.ROOT,
    category: ComponentCategoryEnum.ROOT,
    tags: [],
    version: '1.0.0',
  },
  config: [],
  children: [],
  parentId: -1,
  isLocked: false,
  isVisible: true,
};

/**
 * ComponentSchema 树结构的 CRUD 实现（单例模式）
 */
class ComTree {
  private static instance: ComTree;
  private root: ComponentSchema;

  // 私有构造函数，防止外部实例化
  private constructor(comTree?: ComponentSchema) {
    // 根节点（默认根节点 id 为 0，可根据需求调整）
    if (!comTree) {
      this.root = defaultRoot;
    } else {
      this.root = (comTree as any).root ? (comTree as any).root : comTree;
    }
  }
  public static create(): ComTree {
    return new ComTree();
  }
  // 公共静态方法获取唯一实例
  public static getInstance(): ComTree {
    if (!ComTree.instance) {
      ComTree.instance = new ComTree();
    }
    return ComTree.instance;
  }

  public setRoot(root: ComponentSchema): void {
    this.root = (root as any).root ? (root as any).root : root;;
  }

  public getRoot(): ComponentSchema {
    return this.root;
  }

  // 递归查找节点（核心辅助方法）
  public findNode(targetId: number, node = this.root): ComponentSchema | undefined {
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
  public addNode(newNode: ComponentSchema, parentId: number, childrenArrIndex: number) {
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
    parentNode.children = parentNode.children || [];
    // 处理 childrenArrIndex 参数
    const insertIndex = childrenArrIndex !== -1 ? childrenArrIndex : parentNode.children?.length || 0;

    // 校验子节点 ID 唯一性
    // 在 main.tsx 中启用了 React.StrictMode ，这会导致组件在开发模式下进行双重渲染，包括 useDrop 钩子的设置和事件处理函数。 所以会暂时报错
    if (this.findNode(newNode.comSchemaId)) {
      console.error(`节点 ID ${newNode.comSchemaId} 已存在`);
      return false;
    }
    // 初始化 children（防止传入的新节点没有 children 属性）
    newNode.children = newNode.children || [];
    // 添加子节点
    parentNode.children.splice(insertIndex, 0, newNode);
    // 更新子节点的 parentId
    newNode.parentId = parentId;
    return true;
  }

  // 删除节点（包含其子节点）
  public removeNode(targetId: number) {

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
  public updateNodeConfig(targetId: number, areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentValue: string) {
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
  public updateNodeUnit(targetId: number, areaName: ConfigAreaEnum, field: ConfigItemFieldEnum, currentUnit: string) {
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

  // 拖拽函数
  public dropDrag(sourceId: number, targetParentId: number, childrenIndex: number) {
    // 1. 验证参数有效性
    if (!sourceId || !targetParentId) {
      throw new Error('缺少必要参数');
    }

    // 2. 防止源组件自身作为目标父组件
    if (sourceId === targetParentId) {
      return;
    }

    // 3. 查找源组件和目标父组件
    const sourceComponent = this.findNode(sourceId);
    const targetParentComponent = this.findNode(targetParentId);

    if (!sourceComponent) {
      throw new Error(`源组件 ${sourceId} 不存在`);
    }

    if (!targetParentComponent) {
      throw new Error(`目标父组件 ${targetParentId} 不存在`);
    }

    // 6. 保存原父组件ID，用于错误恢复
    const originalParentId = sourceComponent.parentId;

    // 7. 执行拖拽操作
    const removeResult = this.removeNode(sourceId);
    if (!removeResult) {
      throw new Error(`移除源组件 ${sourceId} 失败`);
    }
    const childrenArrIndex = childrenIndex !== undefined ? childrenIndex : -1;


    const addResult = this.addNode(sourceComponent, targetParentId, childrenArrIndex);

    if (!addResult) {
      // 如果添加失败，尝试恢复源组件到原来的父组件
      this.addNode(sourceComponent, originalParentId, childrenArrIndex);
      throw new Error(`将源组件 ${sourceId} 添加到目标父组件 ${targetParentId} 失败`);
    }
  }

  public updateNodeLock(targetId: number) {
    const targetNode = this.findNode(targetId);
    if (!targetNode) {
      console.error(`节点 ${targetId} 不存在`);
      return false;
    }
    targetNode.isLocked = !targetNode.isLocked;
    return true;
  }

  // 打印树形结构（辅助方法，便于调试）
  public printTree(node = ComTree.instance.root, level = 0) {
    const indent = '  '.repeat(level);
    console.log(`${indent}├── ${node.comSchemaId} - ${node.metadata.componentName}`);
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => this.printTree(child, level + 1));
    }
  }
}

export { ComTree };
export const comTreeInstance = ComTree.getInstance();

// 导出工具函数
export const findNode = (componentID: number): ComponentSchema | undefined => {
  return comTreeInstance.findNode(componentID);
};