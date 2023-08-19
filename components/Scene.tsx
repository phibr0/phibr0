'use client';

import { Physics, useBox, usePlane } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';

import { Cursor, useDragConstraint } from './3d/Drag';

function Scene() {
  return (
    <>
      <motion.pointLight
        animate={{
          // @ts-expect-error
          intensity: 66,
        }}
        transition={{
          duration: 2,
        }}
        position={[10, 10, 10]}
        color="white"
        castShadow
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      <ambientLight intensity={40} color="#0F0F0F" />
      <Cursor />
      <Cube />
      <Floor />
    </>
  );
}

const Cube = () => {
  const [ref] = useBox(() => ({
    mass: 10,
    position: [0, 100, 0],
    args: [5, 5, 5],
  }));
  const bind = useDragConstraint(ref);

  return (
    <>
      {/* @ts-expect-error */}
      <group ref={ref} {...bind} dispose={null}>
        <mesh castShadow>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color="grey" dithering />
        </mesh>
      </group>
    </>
  );
};

const Floor = () => {
  const [ref] = usePlane(() => ({
    type: 'Static',
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    /* @ts-expect-error */
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="grey" roughness={0.5} dithering />
    </mesh>
  );
};

export const Provider = () => (
  <Canvas
    dpr={[1, 2]}
    shadows
    camera={{ position: [-40, 40, 40], fov: 25, near: 1, far: 100 }}
  >
    <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
      <Scene />
    </Physics>
  </Canvas>
);
