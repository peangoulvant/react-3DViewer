import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

interface PlaneProps {
    size: [number, number];
    ripple: number;
    frequency: number;
}

/**
 * Modèle de l'eau de surface
 * @param size
 * @param ripple
 * @param frequency 
 * @returns 
 */
const Surfacewater: React.FC<PlaneProps> = ({ size, ripple, frequency }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.set(-Math.PI / 2, 0, 0);
            meshRef.current.position.set(0, 0, 0);
            // uTime est une variable uniforme qui est mise à jour à chaque frame
            // pour animer l'eau
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime() * frequency;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[size[0], size[1], 64, 64]} />
            <shaderMaterial
                attach="material"
                uniforms={{
                    uTime: { value: 0 },
                }}
                vertexShader={`
                    uniform float uTime;
                    varying vec2 vUv;
                    varying float vHeight;
                    float noise(vec2 p) {
                      return sin(p.x) * cos(p.y);
                    }
                    void main() {
                      vUv = uv;
                      vec3 pos = position;
                      float wave1 = sin(pos.x * 3.0 + uTime) * ${ripple};
                      float wave2 = sin(pos.y * 3.0 + uTime) * ${ripple};
                      float wave3 = noise(pos.xy * 2.0 + uTime) * ${ripple} * 0.5;
                      pos.z = wave1 + wave2 + wave3;
                      vHeight = pos.z;
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                    }
                  `}
                fragmentShader={`
                    varying vec2 vUv;
                    varying float vHeight;
                    void main() {
                      vec3 color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), vHeight * 0.5 + 0.5);
                      gl_FragColor = vec4(color, 0.7);
                    }
                  `}
                side={THREE.DoubleSide}
                transparent={true}
            />
        </mesh>
    );
};

export default Surfacewater;