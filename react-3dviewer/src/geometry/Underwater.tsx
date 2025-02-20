import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

interface PlaneProps {
    size: [number, number];
}

/**
 * Modèle de l'eau sous-marine
 * @param size 
 * @returns 
 */
const Underwater: React.FC<PlaneProps> = ({ size }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.set(-Math.PI / 2, 0, 0);
            meshRef.current.position.set(0, -3, 0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[size[0], size[1], 64, 64]} />
            <meshStandardMaterial color={'#2a89c3'} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default Underwater;