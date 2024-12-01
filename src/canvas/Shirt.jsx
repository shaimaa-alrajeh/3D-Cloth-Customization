import React from 'react'
import * as THREE from 'three';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import state from '../store';
import { useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { MeshStandardMaterial } from 'three';


const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt.glb')



  const [decalProperties, setDecalProperties] = useState({
    position: null,
    normal: new THREE.Vector3(0, 1, 0),
    scale: [0.5, 0.5, 0.5],
    rotation: [0, 0, 0],
  });

  const [textProperties, setTextProperties] = useState({
    position: null,
    normal: new THREE.Vector3(0, 1, 0),
    scale: [0.5, 0.5, 0.5],
    rotation: [0, 0, 0],
  });

  const [fullProperties, setFullProperties] = useState({
    position: null,
    normal: new THREE.Vector3(0, 1, 0),
    scale: [0.5, 0.5, 0.5],
    rotation: [0, 0, 0],
  });


  const initialMovable = {
    logo: false,
    text: false,
    full: false
  }
  const [movable, setMovable] = useState({
    logo: true,
    text: false,
    full: false
  });
  const { raycaster, mouse } = useThree();
  const logoTexture = useTexture(snap.frontLogoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const backLogoTexture = useTexture(snap.backLogoDecal);

  const handlePointerMove = (event) => {
    raycaster.setFromCamera(mouse, event.camera);

    for (const key in snap.movable) {
      if (snap.movable[key]) {
        const intersects = raycaster.intersectObject(nodes.T_Shirt_male);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          if (key === 'text') {
            setTextProperties((prev) => ({
              ...prev,
              position: intersect.point,
              normal: intersect.face.normal,
            }));
          } else if (key === 'logo') {
            setDecalProperties((prev) => ({
              ...prev,
              position: intersect.point,
              normal: intersect.face.normal,
            }));
          }
          else if (key === 'full') {
            setFullProperties((prev) => ({
              ...prev,
              position: intersect.point,
              normal: intersect.face.normal,
            }));
          }
        }

      }
    }

  };
  const handleDoubleClick = () => {
    state.movable={ ...initialMovable }
  }

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

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
  }

  return (
    <>
    
      <OrbitControls />
      <group key={stateString}>
        
        <mesh
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          position={[3.059, 0, 0.125]}
          rotation={[0, 0, 0]}

          onPointerMove={handlePointerMove}
          onDoubleClick={handleDoubleClick}

          material-roughness={0.5}
          material-metalness={0.5}
          dispose={null}
        >

          {snap.isFullTexture && (
            <Decal
              // debug
              position={fullProperties.position}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {snap.isFrontLogoTexture && (
            <Decal
              // debug
              position={decalProperties.position}
              normal={decalProperties.normal}
              scale={snap.frontLogoScale}
              rotation={decalProperties.rotation}
              map-anisotropy={16}
              depthTest={false}
              depthWrite={false}
            >
              <meshStandardMaterial
                map={logoTexture}
                transparent
              />
            </Decal>
          )}


          {snap.isFrontText && (
            <Decal
              // debug
              position={textProperties.position}
              normal={textProperties.normal}
              scale={snap.frontTextScale}
              rotation={snap.frontTextRotation}
              map={createTextTexture(snap.frontText, snap.frontTextFont, snap.frontTextSize, snap.frontTextColor)}
            />
          )}



        </mesh>
      </group>
    </>
  );
}

export default Shirt
