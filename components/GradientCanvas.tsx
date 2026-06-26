'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

/* A slow, light "mesh gradient": fbm-warped flow of two soft brand tints over white.
   Kept low-contrast so dark text stays legible above it. */
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = vec2(uv.x * uAspect, uv.y) * 1.6;
    float t = uTime * 0.025;

    float warp = fbm(p + vec2(t, t * 0.6));
    float n = fbm(p + warp * 0.8 + vec2(-t * 0.4, t * 0.3));

    vec3 white = vec3(1.0);
    vec3 amber = vec3(0.965, 0.905, 0.785);
    vec3 cool  = vec3(0.882, 0.925, 0.965);

    vec3 col = white;
    col = mix(col, amber, smoothstep(0.42, 0.78, n) * 0.55);
    col = mix(col, cool,  smoothstep(0.40, 0.74, 1.0 - n) * 0.45);

    // keep the type-zone (upper-left) cleaner, let color bloom toward edges
    float clean = smoothstep(0.0, 0.95, distance(uv, vec2(0.28, 0.62)));
    col = mix(col, white, (1.0 - clean) * 0.5);

    // gentle top fade into the page
    col = mix(white, col, smoothstep(0.0, 0.5, uv.y) * 0.85 + 0.15);

    gl_FragColor = vec4(col, 1.0);
  }
`

function GradientPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAspect: { value: 1 } }),
    [],
  )
  useFrame((state) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = state.clock.elapsedTime
      ref.current.uniforms.uAspect.value = state.size.width / Math.max(1, state.size.height)
    }
  })
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  )
}

export default function GradientCanvas() {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas
      className="hero__canvas"
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      frameloop={reduce ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <GradientPlane />
    </Canvas>
  )
}
