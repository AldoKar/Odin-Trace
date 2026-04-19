import * as React from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { MarkerData } from './simpleMarkers';

export default function Marker({ data }: { data: MarkerData }) {
  const [hovered, setHovered] = React.useState(false);

  // Memoizar geometria y posición para performance
  const position = React.useMemo(
    () => new THREE.Vector3(...data.position),
    [data.position]
  );

  const rotation = React.useMemo(
    () => new THREE.Euler(...data.rotation),
    [data.rotation]
  );

  // Tamaño de la base del marcador
  const baseSize = 0.035;

  return (
    <mesh
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {/* BoxGeometry: args=[width, height, depth] -> depth es el eje que mira afuera (Z) */}
      <boxGeometry args={[baseSize, baseSize, data.height]} />

      <meshStandardMaterial
        color={hovered ? '#fbbf24' : data.color}
        emissive={hovered ? '#d97706' : '#991b1b'}
        emissiveIntensity={hovered ? 2 : 0.5}
      />

      {hovered && (
        <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
          <div
            className="pointer-events-none select-none bg-black/90 text-white p-3 rounded-lg shadow-xl backdrop-blur-sm border border-white/10"
            style={{ minWidth: '120px' }}
          >
            <div className="font-bold text-sm mb-1 capitalize">
              {data.city || data.name}
            </div>
            <div className="text-xs text-yellow-400 font-mono">
              Value: {data.value.toFixed(1)}
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
