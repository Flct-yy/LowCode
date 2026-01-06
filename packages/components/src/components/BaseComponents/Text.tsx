import React from 'react';
function Text({
  text,
  componentClassName,
  inlineStyle,
  handleComponentSelect,
}: {
  text: string;
  componentClassName: string;
  inlineStyle: React.CSSProperties;
  handleComponentSelect: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`component-preview__default component-preview__text ${componentClassName}`}
      style={inlineStyle}
      onMouseDown={handleComponentSelect}
    >
      {text !== '' && text}
    </div>
  );
}
