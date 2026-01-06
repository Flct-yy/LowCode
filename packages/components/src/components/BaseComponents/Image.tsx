import React, { useRef, useMemo } from 'react';
import { ComponentSchema } from '@wect/type';
import convertConfigToStyle from '@/utils/convertConfigToStyle';
import { getConfigImageUrl } from '@/utils/index';

function Image({
  component,
  componentClassName,
  handleDnD,
  handleComponentSelect,
}: {
  component: ComponentSchema;
  componentClassName: string;
  handleDnD: (ref: React.RefObject<HTMLDivElement | null>) => { canDrop: boolean; isOverShallow: boolean; };
  handleComponentSelect: (e: React.MouseEvent) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // 获得组件图片url
  const imageUrl = getConfigImageUrl(component.config);

  // 处理拖拽
  const { canDrop, isOverShallow } = handleDnD(divRef);

  // 转换组件配置为 内联样式和类名
  const { style: inlineStyle, className } = convertConfigToStyle(component)
  const newClassName = useMemo(() => {
    return `${componentClassName}  ${canDrop && isOverShallow ? 'component-preview__can-drop' : ''} ${className}`
  }, [componentClassName, className, canDrop, isOverShallow])

  return (
    <div ref={divRef}
      className={`component-preview__default component-preview__image ${newClassName}`}
      style={inlineStyle}
      onMouseDown={handleComponentSelect}>
      {imageUrl ? <img className="img" src={imageUrl} alt='图片' /> : '未上传图片'}
    </div>
  );
}

export { Image };
