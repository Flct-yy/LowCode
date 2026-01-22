import { ComponentSchema, ComponentTypeEnum } from '@wect/type';
import { exportAllStyles, getConfigImageUrl, getConfigText, convertConfigToStyle } from '@wect/components';


const componentToHtml = (component: ComponentSchema): string => {
  if (!component) {
    return '';
  }

  const { metadata, config, children } = component;
  let html = '';
  let { style, className } = convertConfigToStyle(component);
  const textValue = getConfigText(config) || '';
  const imageUrl = getConfigImageUrl(config) || '';

  // 根据组件类型生成HTML
  switch (metadata.componentType) {
    case ComponentTypeEnum.ROOT:
      html = `<div class="component__root ${className}" ${style}>`;
      break;
    case ComponentTypeEnum.FLEX:
      html = `<div class="component__flex ${className}" ${style}>`;
      break;
    case ComponentTypeEnum.TEXT:
      // 提取文本内容
      html = `<div class="component__text ${className}" ${style}>${textValue}</div>`;
      break;
    case ComponentTypeEnum.BUTTON:
      html = `<button class="component__button ${className}" ${style}>${textValue}</button>`;
      break;
    case ComponentTypeEnum.IMAGE:
      html = `<img src="${imageUrl}" alt="${textValue}" class="component__image ${className}" ${style} />`;
      break;
    case ComponentTypeEnum.INPUT:
      html = `<input type="text" placeholder="${textValue}" class="component__input ${className}" ${style} />`;
      break;
    default:
      html = `<div class="${className}" ${style}>`;
      break;
  }

  // 处理子组件
  if (children && children.length > 0) {
    children.forEach(child => {
      html += componentToHtml(child as ComponentSchema);
    });
  }

  // 关闭标签
  if ([ComponentTypeEnum.ROOT, ComponentTypeEnum.FLEX].includes(metadata.componentType)) {
    html += '</div>';
  }

  return html;
}

export const wholeHtml = (title: string, root: ComponentSchema): string => {
  const contentHtml = componentToHtml(root);
  const contentStyle = exportAllStyles();
  const htmlString = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Low Code Page'}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    ${contentStyle}
  </style>
</head>
<body>
  <div>
    ${contentHtml}
  </div>
</body>
</html>
      `;
  return htmlString.replace('${contentHtml}', contentHtml);
};
