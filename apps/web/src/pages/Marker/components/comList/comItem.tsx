import React from 'react';
import component from '@type/component';

const ComItem: React.FC<component & { itemWidth: number }> = ({ id, text, name, icon, config, itemWidth }) => {
  console.log(itemWidth);
  return (
    <div className="com-item" style={{ width: `${itemWidth}px`, height: `${itemWidth}px` }}>
      <i style={{ backgroundImage: `url(${icon})` }} className="com-item__icon" />
      <span>
        {text}
      </span>
    </div>
  );
}

export default ComItem;