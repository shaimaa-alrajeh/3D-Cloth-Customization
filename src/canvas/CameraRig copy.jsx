import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const CameraRig = ({ children }) => {
  const { camera } = useThree();

  useEffect(() => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    let targetPosition = [-0.4, 0, 2];
    // set the initial position of the model

    //pant
    // let targetPosition = [-0.4, 0, -600];
    //GirlsShirt
    // let targetPosition = [-0.4, 0, -600];
    //Dreess
    // let targetPosition = [-0.8, 750, -500];
    //girl_Long_dress
    // let targetPosition = [-100, 200, 300];
    if (isBreakpoint) targetPosition = [0, 0, 2];
    if (isMobile) targetPosition = [0, 0.2, 2.5];

    // set model camera position
    camera.position.set(...targetPosition);
  }, [camera]);

  return <>{children}</>;
};

export default CameraRig;
