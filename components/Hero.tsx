'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, MeshDistortMaterial, useCursor, TorusKnot, RoundedBox, Sphere } from '@react-three/drei';
import { Link as ScrollLink } from 'react-scroll';
import * as THREE from 'three';
import { useState } from 'react';

function AnimatedObjects() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <CircularStructure />
      <FloatingSpheres />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 5]} intensity={1} angle={0.3} penumbra={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0080" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

function CircularStructure() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center Torus Knot */}
      <TorusKnot 
        args={[3, 0.4, 128, 32, 2, 3]} 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#7928ca" 
          metalness={0.7} 
          roughness={0.1} 
          emissive="#7928ca"
          emissiveIntensity={0.4}
        />
      </TorusKnot>
      
      {/* Orbiting Spheres */}
      <RotatingRing radius={6} count={12} height={0.5} color="#ff0080" />
      <RotatingRing radius={8} count={18} height={-1} color="#1fb2a6" rotationSpeed={-0.2} />
      
      {/* Inner Structure */}
      <group rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.3} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.9}
            roughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.6}
          />
        </RoundedBox>
      </group>
    </group>
  );
}

function RotatingRing({ radius = 5, count = 12, height = 0, color = "#ff0080", rotationSpeed = 0.3 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
    }
  });
  
  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Sphere 
            key={i} 
            args={[0.25, 16, 16]} 
            position={[x, height, z]}
          >
            <meshStandardMaterial 
              color={color} 
              metalness={0.8}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        );
      })}
    </group>
  );
}

function FloatingSpheres() {
  const group = useRef<THREE.Group>(null);
  const colors = ['#ff0080', '#1fb2a6', '#9333ea', '#f43f5e', '#3b82f6'];
  const sphereCount = 8;
  const spheres = Array.from({ length: sphereCount }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ],
    scale: Math.random() * 0.3 + 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 0.05 + 0.02,
    rotationSpeed: Math.random() * 0.02 + 0.01,
    distortion: Math.random() * 0.4 + 0.2
  }));

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      group.current.children.forEach((child, i) => {
        const sphere = spheres[i];
        child.position.y += Math.sin(state.clock.getElapsedTime() * sphere.speed) * 0.01;
        child.rotation.x += sphere.rotationSpeed;
        child.rotation.z += sphere.rotationSpeed * 0.5;
      });
    }
  });

  return (
    <group ref={group}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position as any} scale={sphere.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={sphere.color}
            distort={sphere.distortion}
            speed={2}
            roughness={0.4}
            metalness={0.9}
            emissive={sphere.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-screen flex justify-center items-center overflow-hidden bg-background section-bg section-bg-dots">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-background overflow-hidden z-0">
        <div className="absolute -inset-[10%] opacity-30">
          <div className="absolute top-1/4 left-1/4 w-full h-full rounded-full bg-primary blur-3xl animate-pulse" 
               style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/3 right-1/3 w-full h-full rounded-full bg-secondary blur-3xl animate-pulse" 
               style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-1/3 right-1/4 w-2/3 h-2/3 rounded-full bg-accent blur-3xl animate-pulse" 
               style={{ animationDuration: '7s' }} />
        </div>
      </div>
      
      <div className="absolute inset-0 z-0">
        <div ref={canvasRef} className="w-full h-full">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 60 }}>
            <AnimatedObjects />
          </Canvas>
        </div>
      </div>
      
      <div className="section-container relative z-10 flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="gradient-text">Yaroslav</span>
          <br />
          <span className="text-foreground">Full-Stack Developer</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mb-10 text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Specializing in MERN Stack, Vue/Laravel, and Python Backend development.
          Building elegant, scalable, and high-performance web applications.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <ScrollLink
            to="projects"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="btn-primary"
          >
            View Projects
          </ScrollLink>
          
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 rounded-md transition-all"
          >
            About Me
          </ScrollLink>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-sm text-foreground/60 mb-2">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
} 