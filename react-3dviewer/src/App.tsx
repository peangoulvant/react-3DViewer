import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={'lightblue'} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Cube() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
      <Edges>
        <lineBasicMaterial color="black" />
      </Edges>
    </mesh>
  );
}

function App() {
  return (
    <div id="canvas-card">
      <h1>Test</h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Plane />
        <Cube/>
        <OrbitControls />
      </Canvas>
    </div>

  );
}

export default App;
