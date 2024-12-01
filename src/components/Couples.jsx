import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials, scene } = useGLTF('/couples.glb')
  scene.traverse((node) => {
    if (node.isMesh) {
      console.log('shado')
      node.castShadow = true; // Enable shadow casting
      node.receiveShadow = true; // Enable shadow receiving
    }
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.cloth1.geometry}
        material={materials.initialShadingGroup}
        position={[3.059, 0, 0.125]}
        rotation={[Math.PI / 2, 0, 0]} scale={0.05}
      />
    </group>
  )
}

useGLTF.preload('/couples.glb')
