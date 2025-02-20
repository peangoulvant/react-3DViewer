import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Effect from '../effects/Effect';

interface SphereProps {
    position: [number, number, number];
}

/**
 * Modèle de sphère selon la position passée en paramètre
 * @param position 
 * @returns 
 */
const Sphere: React.FC<SphereProps> = ({ position }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.set(position[0], Effect.addBuoyancy(position[1]), position[2]);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    );
};


export default Sphere;