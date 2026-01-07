import { useMemo } from 'react';
import type { ComponentSchema } from "@wect/type";

const RenderComponentContent = ({ component }: { component: ComponentSchema }) => {
  console.log(component);
  const { children } = component;
  return (
    <div>
      {children && children.length > 0 &&
        children.map((child) => (
          <RenderComponentContent key={child.comSchemaId} component={child as ComponentSchema} />
        ))}
    </div>
  )
}

export default RenderComponentContent;