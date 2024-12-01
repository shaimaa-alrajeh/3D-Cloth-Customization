
import React from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, OrbitControls } from '@react-three/drei';

import state from '../store';

const Girls_long_Dreses = () => {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF('/girls_long_sweater.glb');

  const logoTexture = useTexture(snap.frontLogoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const backLogoTexture = useTexture(snap.backLogoDecal);

  useFrame((_, delta) =>
    materials.Knit_Terry_Copy_1_FRONT_1356180 && 
    (materials.Knit_Terry_Copy_1_FRONT_1356180.color.lerp(new THREE.Color(snap.color), 0.1 * delta))
  );

  const createTextTexture = (text, font, size, color) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${size}px ${font}`;
    const textWidth = ctx.measureText(text).width;
    canvas.width = textWidth;
    canvas.height = size;
    ctx.fillStyle = color;
    ctx.font = `${size}px ${font}`;
    ctx.fillText(text, 0, size);
    return new THREE.CanvasTexture(canvas);
  };

  return (
    <>
      <OrbitControls />
      <group rotation={[0, 0, 0]} scale={1} dispose={null}>
        <mesh
          geometry={nodes.Girls_Long_Sweater_Knit_Terry_Copy_1_FRONT_1356180_0.geometry}  
          material={materials.Knit_Terry_Copy_1_FRONT_1356180}
          material-metalness={0.1}
        >
          {snap.isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {snap.isFrontLogoTexture && (
            <Decal
              position={snap.frontLogoPosition}
              rotation={[0, 0, 0]}
              scale={snap.frontLogoScale}
              map={logoTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {snap.isFrontText && (
            <Decal
              position={snap.frontTextPosition}
              rotation={snap.frontTextRotation}
              scale={snap.frontTextScale}
              map={createTextTexture(
                snap.frontText,
                snap.frontTextFont,
                snap.frontTextSize,
                snap.frontTextColor
              )}
            />
          )}
        </mesh>

        <mesh
          geometry={nodes.Girls_Long_Sweater_Knit_Terry_FRONT_1356169_0.geometry} 
          material={materials.Knit_Terry_FRONT_1356169} 
        />
      </group>
    </>
  );
};

export default Girls_long_Dreses;
