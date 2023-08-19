import { forwardRef } from 'react';
import { RoundedBox, ShapeProps } from '@react-three/drei';

export const Block = forwardRef<any, any>(
  (
    {
      children,
      transparent = false,
      opacity = 1,
      color = 'white',
      args = [1, 1, 1],
      ...props
    },
    ref,
  ) => {
    return (
      <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
        <meshStandardMaterial
          color={color}
          transparent={transparent}
          opacity={opacity}
        />
        {children}
      </RoundedBox>
    );
  },
);
Block.displayName = 'Block';
