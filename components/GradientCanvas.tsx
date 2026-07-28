'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

/* Cinematic "silk gradient": twice domain-warped fbm flow of layered brand tints
   over white, with a slow drift, a cursor-following light bloom, moving light
   streaks, a soft vignette, and filmic grain. Kept low-contrast in the centre so
   dark hero type stays legible above it. */
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAspect;
  uniform vec2  uMouseSm; // eased -1..1

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 m  = uMouseSm * 0.35;
    vec2 p  = vec2(uv.x * uAspect, uv.y) * 1.55 + m;
    float t = uTime * 0.028;

    // two-stage domain warp -> silk-like depth
    vec2 w1 = vec2(fbm(p + vec2(t, t * 0.7)), fbm(p + vec2(4.3 - t * 0.5, 1.7 + t * 0.4)));
    vec2 w2 = vec2(fbm(p + w1 * 1.2 + vec2(-t * 0.3, t * 0.25)), fbm(p * 1.1 + w1 - vec2(t * 0.2)));
    float n  = fbm(p + w2 * 0.9);
    float n2 = fbm(p * 1.7 - w1 * 0.6 + vec2(t * 0.5));

    vec3 white  = vec3(1.0);
    vec3 amber  = vec3(0.972, 0.890, 0.742);
    vec3 cool   = vec3(0.858, 0.910, 0.972);
    vec3 violet = vec3(0.902, 0.882, 0.972);

    vec3 col = white;
    col = mix(col, amber,  smoothstep(0.40, 0.80, n) * 0.62);
    col = mix(col, cool,   smoothstep(0.38, 0.76, 1.0 - n) * 0.52);
    col = mix(col, violet, smoothstep(0.55, 0.92, n2) * 0.30);

    // moving diagonal light streaks (subtle sheen)
    float streak = sin((uv.x * uAspect + uv.y) * 6.0 - uTime * 0.5 + n * 3.0);
    col += vec3(0.03, 0.028, 0.04) * smoothstep(0.86, 1.0, streak);

    // cursor-following soft light bloom
    vec2 mp = (uMouseSm * 0.5 + 0.5);
    float glow = 1.0 - smoothstep(0.0, 0.55, distance(uv, mp));
    col += vec3(0.05, 0.05, 0.06) * glow;

    // keep the centre (hero type zone) cleaner
    float clean = smoothstep(0.0, 0.9, distance(uv, vec2(0.5, 0.52)));
    col = mix(col, white, (1.0 - clean) * 0.55);

    // top fade into the page + soft vignette
    col = mix(white, col, smoothstep(0.0, 0.5, uv.y) * 0.85 + 0.15);
    float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
    col *= mix(0.965, 1.0, vig);

    // filmic grain
    float g = hash(uv * 900.0 + uTime) - 0.5;
    col += g * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`

function GradientPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseSm: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  )
  useFrame((state) => {
    const u = ref.current?.uniforms
    if (!u) return
    u.uTime.value = state.clock.elapsedTime
    u.uAspect.value = state.size.width / Math.max(1, state.size.height)
    ;(u.uMouse.value as THREE.Vector2).set(state.pointer.x, state.pointer.y)
    // ease the pointer for a fluid, expensive feel
    ;(u.uMouseSm.value as THREE.Vector2).lerp(u.uMouse.value as THREE.Vector2, 0.045)
  })
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  )
}

export default function GradientCanvas() {
  // Mount WebGL only if the browser supports it and motion is allowed;
  // otherwise render nothing -> clean white hero, never a white-screen crash.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
      if (gl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setReady(true)
    } catch { /* no WebGL -> stay clean */ }
  }, [])
  if (!ready) return null
  return (
    <Canvas
      className="hero__canvas"
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <GradientPlane />
    </Canvas>
  )
}
