import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import {
  OrbitControls,
  Stars,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import EarthColorMap from './assets/8k_earth_clouds.jpg';
import EarthCloudsMap from './assets/8k_earth_nightmap.jpg';
import type { MarkerData } from './simpleMarkers';
import Marker from './Marker';

// Props actualizadas: solo recibimos datos, no meshes
type EarthProps = {
  markers?: MarkerData[];
  earthTextureUrl?: string;
};

export default function Earth({ markers = [], earthTextureUrl }: EarthProps) {
  const textureUrls = React.useMemo(
    () => [earthTextureUrl ?? EarthColorMap, EarthCloudsMap],
    [earthTextureUrl]
  );
  const [colorMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    textureUrls
  );

  const earthRef = React.useRef<THREE.Group>(null!);
  const cloudsRef = React.useRef<THREE.Mesh>(null!);
  const [isUserInteracting, setIsUserInteracting] = React.useState(false);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (!isUserInteracting) {
      if (earthRef.current) earthRef.current.rotation.y = elapsedTime / 20;
      if (cloudsRef.current) cloudsRef.current.rotation.y = elapsedTime / 20;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      <Stars
        radius={300}
        depth={60}
        count={5000}
        factor={6}
        saturation={0}
        fade
      />

      <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={45} />

      <OrbitControls
        enableRotate={true}
        enableZoom={true}
        enablePan={false}
        zoomSpeed={0.8}
        rotateSpeed={0.5}
        onStart={() => setIsUserInteracting(true)}
        onEnd={() => setIsUserInteracting(false)}
        minDistance={3}
        maxDistance={12}
      />

      {/* Clouds Layer */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.008, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.3}
          depthWrite={false}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Earth Group */}
      <group position={[0, 0, 0]} ref={earthRef}>
        {/* Earth Sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            normalScale={new THREE.Vector2(100, 100)} // Fake bump interaction
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>

        {/* Markers Rendering */}
        {markers.map((marker) => (
          <Marker key={marker.id} data={marker} />
        ))}
      </group>
    </>
  );
}
