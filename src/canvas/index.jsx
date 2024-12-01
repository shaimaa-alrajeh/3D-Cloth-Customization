import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei';
import Shirt from './Shirt';
import CameraRig from './CameraRig';
import OBJComponent from './OBJComponent';
import * as THREE from "three";
import { useRef } from 'react';
import { useThree } from "@react-three/fiber";
import { Decal, useGLTF } from "@react-three/drei";
import { useState, useEffect } from 'react';

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      
      className="w-full max-w-full h-full transition-all ease-in"
    >
      {/* <ambientLight intensity={0.8} /> */}

      <directionalLight
        castShadow
        position={[0, 100,  10]}
        // intensity={1}
      />

      <CameraRig>
        <Center>
          <Shirt />
          
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel