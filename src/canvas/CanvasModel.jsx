import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei';
import Shirt from './Shirt';
import CameraRig from './CameraRig';
import { Female as SportyBra } from './Female';
import Pant from './pant';
import Dreess from './Dreess';
import Girls_long_Dreses from './Girls_long_Dreses';
// import GirlsShirt from './GirlsShirt';
// import BoyShirt from './boyShirt';

// import FemaleShirt from './FemaleShirt';

// import FemaleShirt from './FemaleShirt';

const CanvasModel = ({ show }) => {
  if (!show) return null;
  return (
    <Canvas
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.8} />
      <directionalLight
        castShadow
        position={[0, 0, 30]}
        intensity={1}
      />
      <CameraRig>
        <Center>
          {/* <Shirt/> */}
          {/* <Pant/> */}
          {/* <GirlsShirt/> */}
          {/* <Dreess/> */}
          {/* <Girls_long_Dreses /> */}
          {/*  <SportyBra scale={2.5} position={[0, -3,0]} /> */} {/* red tshirt */}
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel