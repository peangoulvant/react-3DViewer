import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sphere from './geometry/Sphere';
import Underwater from './geometry/Underwater';
import Surfacewater from './geometry/Surfacewater';
import Ship from './geometry/Ship';

function App() {
  return (
    <div id="canvas-card">
      <h1>Test</h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Surfacewater size={[15, 15]} ripple={0.05} frequency={2.0} />
        <Ship position={[0, 0, 0]} width={5} height={1} depth={1} />
        <Sphere position={[0, -0.5, 0]} />
        <Underwater size={[20, 20]} />
        <OrbitControls />
      </Canvas>
    </div>

  );
}

export default App;
