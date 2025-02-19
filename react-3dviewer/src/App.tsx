import React, { useRef } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


function Plane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        attach="material"
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z = sin(pos.x * 2.0 + uTime) * 0.05 + sin(pos.y * 2.0 + uTime) * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(0.4, 0.7, 1.0, 0.7);
          }
        `}
        side={THREE.DoubleSide}
        transparent={true}
      />
    </mesh>
  );
}

function PlaneBelow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshStandardMaterial color={'blue'} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Cube() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
      <Edges>
        <lineBasicMaterial color="black" />
      </Edges>
    </mesh>
  );
}

function Sphere() {
  return (
    <mesh position={[0, -0.5, 0]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={'yellow'} />
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
        <Cube />
        <Sphere/>
        <PlaneBelow />
        <OrbitControls />
      </Canvas>
    </div>

  );
}

export default App;
