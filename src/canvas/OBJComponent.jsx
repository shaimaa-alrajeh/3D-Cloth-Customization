import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree, useLoader } from '@react-three/fiber';
import { Decal } from '@react-three/drei';
import { TextureLoader, MeshStandardMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const OBJComponent = () => {
  const [decalPosition, setDecalPosition] = useState([0, 0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const objRef = useRef(); // Reference for the OBJ group
  const meshRef = useRef(); // Reference for the Mesh
  const { camera } = useThree();

  // Load resources
  const texture = useLoader(TextureLoader, '/threejs.png');
  const obj = useLoader(OBJLoader, '/cloth1.obj');

  if (!obj) return <div>Error loading OBJ model</div>;

  // Assign a material to the OBJ mesh
  obj.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshStandardMaterial({ color: 'blue' });
    }
  });

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current, true);

      if (intersects.length > 0) {
        const intersectPoint = intersects[0].point;
        setDecalPosition([intersectPoint.x, intersectPoint.y, intersectPoint.z]);
      }
    }
  };

  return (
    <group ref={objRef}>
      {/* Render the OBJ as a mesh */}
      <mesh ref={meshRef}>
        <primitive object={obj} />
      </mesh>

      {/* Decal explicitly linked to the Mesh */}
      <Decal
        mesh={meshRef.current} // Specify the mesh for the Decal
        position={decalPosition}
        rotation={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        map={texture}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      />
    </group>
  );
};

export default OBJComponent;
