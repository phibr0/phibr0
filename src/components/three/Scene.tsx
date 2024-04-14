'use client';

import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';

function Scene() {
  return (
    <>
      <motion.pointLight
        animate={{
          // @ts-expect-error
          intensity: 40,
        }}
        transition={{
          duration: 3,
        }}
        position={[10, 10, 10]}
        color="white"
        castShadow
        shadow-mapSize={1024}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      <motion.ambientLight
        animate={{
          // @ts-expect-error
          intensity: 40,
        }}
        transition={{
          duration: 3,
        }}
        initial={{
          // @ts-expect-error
          intensity: 47,
        }}
        color="#0F0F0F"
      />
      <Cube />
      <Box />
      <Sphere />
      <Floor />
    </>
  );
}

const Box = () => {
  const [ref] = useBox(() => ({
    mass: 5,
    position: [10, 100, 5],
    args: [6, 3, 2],
    rotation: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
  }));

  return (
    <>
      {/* @ts-expect-error */}
      <group ref={ref} dispose={null}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 3, 2]} />
          <meshStandardMaterial color="grey" dithering />
        </mesh>
      </group>
    </>
  );
};

const Sphere = () => {
  const [ref] = useSphere(() => ({
    mass: 10,
    position: [4, 80, 2],
    args: [1],
    rotation: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
  }));

  return (
    <>
      {/* @ts-expect-error */}
      <group ref={ref}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="grey" dithering />
        </mesh>
      </group>
    </>
  );
};

const Cube = () => {
  const [ref] = useBox(() => ({
    mass: 10,
    position: [0, 120, 0],
    args: [5, 5, 5],
    rotation: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
  }));

  return (
    <>
      {/* @ts-expect-error */}
      <group ref={ref} dispose={null}>
        <mesh castShadow receiveShadow>
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
      <planeGeometry args={[150, 150]} />
      <meshStandardMaterial color="grey" dithering />
    </mesh>
  );
};

export default function Provider() {
  return (
    <Canvas
      frameloop="demand"
      shadows
      style={{ pointerEvents: 'none' }}
      camera={{ position: [-40, 40, 40], fov: 25, near: 1, far: 100 }}
    >
      <Physics allowSleep gravity={[0, -200, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  );
}
