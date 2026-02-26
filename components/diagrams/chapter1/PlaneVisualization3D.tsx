'use client';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface PlaneConfig {
  normal: [number, number, number];
  constant: number;
  color: string;
  label: string;
}

interface PlaneVisualization3DProps {
  planes: PlaneConfig[];
  title?: string;
}

function PlaneObject({ normal, constant, color, opacity = 0.55 }: { normal: [number, number, number]; constant: number; color: string; opacity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const n = new THREE.Vector3(...normal).normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);

  const point = n.clone().multiplyScalar(constant / n.dot(n.clone()));

  return (
    <mesh position={point} quaternion={quaternion} ref={meshRef}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function AxisHelper() {
  return (
    <group>
      {/* X axis - red */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Y axis - green */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      {/* Z axis - blue */}
      <mesh position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}

export default function PlaneVisualization3D({ planes }: PlaneVisualization3DProps) {
  return (
    <div className="space-y-3">
      <div className="h-72 rounded-xl overflow-hidden bg-muted/20 border border-border">
        <Canvas camera={{ position: [4, 3, 4], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          {planes.map((p, i) => (
            <PlaneObject key={i} normal={p.normal} constant={p.constant} color={p.color} />
          ))}
          <AxisHelper />
          <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
          <gridHelper args={[6, 6, '#d1d5db', '#e5e7eb']} />
        </Canvas>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {planes.map((p, i) => (
          <span key={i} className="flex items-center gap-1.5 text-xs font-mono">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: p.color }} />
            {p.label}
          </span>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">Drag to rotate · Scroll to zoom</p>
    </div>
  );
}
