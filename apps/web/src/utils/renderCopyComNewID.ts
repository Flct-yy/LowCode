import { ComponentSchema } from "@wect/type";

const renderCopyComNewID = (comSchema: ComponentSchema): ComponentSchema => {
  // 递归为组件和所有子组件生成新的唯一ID
  // 生成新的comSchemaId: 时间戳+随机数
  const newId = new Date().getTime() + Math.floor(Math.random() * 1000);
  // 递归处理子组件
  const newChildren = (comSchema.children || []).map(child => {
    const newChild = renderCopyComNewID(child);
    // 更新子组件的parentId为新生成的父组件ID
    return {
      ...newChild,
      parentId: newId
    };
  });
  return {
    ...comSchema,
    comSchemaId: newId,
    children: newChildren
  };
}

export default renderCopyComNewID;
