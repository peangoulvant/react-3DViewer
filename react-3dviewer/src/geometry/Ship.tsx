import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import Effect from '../effects/Effect';

interface ShipProps {
    position: [number, number, number];
    width: number;
    height: number;
    depth: number;
}

/**
 * Modèle de bateau selon les dimensions et la position passées en paramètre
 * @param position 
 * @param width
 * @param height
 * @param depth 
 * @returns 
 */
const Ship: React.FC<ShipProps> = ({ position, width, height, depth }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.set(position[0], Effect.addBuoyancy(position[1]), position[2]);
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={'orange'} />
            <Edges>
                <lineBasicMaterial color="black" />
            </Edges>
        </mesh>
    );
};


export default Ship;