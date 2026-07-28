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

/* Stripe-style flowing "silk" gradient: a vivid orange -> pink -> purple -> blue
   flow field, bold toward the top/right/edges and clean-white behind the centred
   hero type. Cursor-reactive light bloom, moving sheen streaks, vignette + grain. */
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
    vec2 m  = uMouseSm * 0.30;
    vec2 p  = vec2(uv.x * uAspect, uv.y) * 1.4 + m;
    float t = uTime * 0.030;

    // flowing silk field
    vec2 w1 = vec2(fbm(p + vec2(t, t * 0.6)), fbm(p + vec2(5.2 - t * 0.4, 2.1 + t * 0.3)));
    float flow = fbm(p + w1 * 1.3 + vec2(-t * 0.3, t * 0.2));
    flow = flow * 0.72 + (uv.x + (1.0 - uv.y)) * 0.18; // diagonal warm(top-right) -> cool(bottom-left)

    // vivid Stripe palette ramp
    vec3 orange = vec3(1.00, 0.58, 0.23);
    vec3 pink   = vec3(0.98, 0.36, 0.62);
    vec3 purple = vec3(0.55, 0.40, 1.00);
    vec3 blue   = vec3(0.28, 0.52, 1.00);
    vec3 grad = orange;
    grad = mix(grad, pink,   smoothstep(0.22, 0.46, flow));
    grad = mix(grad, purple, smoothstep(0.46, 0.66, flow));
    grad = mix(grad, blue,   smoothstep(0.66, 0.92, flow));

    // intensity: bold at top/right/edges, clean white behind centred text
    float dc   = distance(uv, vec2(0.5, 0.5));
    float edge = smoothstep(0.14, 0.62, dc);
    float tr   = smoothstep(-0.1, 1.2, uv.x + uv.y);       // top-right bias
    float band = smoothstep(0.35, 0.90, flow) * 0.5 + 0.5;
    float intensity = clamp(edge * mix(0.55, 1.12, tr) * band, 0.0, 1.0);

    vec3 white = vec3(1.0);
    vec3 col = mix(white, grad, intensity * 0.9);

    // cursor-following light bloom
    vec2 mp = uMouseSm * 0.5 + 0.5;
    col += (grad * 0.30 + 0.05) * (1.0 - smoothstep(0.0, 0.5, distance(uv, mp))) * 0.4;

    // moving sheen streaks (subtle)
    float streak = sin((uv.x * uAspect - uv.y) * 7.0 - uTime * 0.6 + flow * 4.0);
    col += vec3(0.045) * smoothstep(0.9, 1.0, streak) * intensity;

    // top fade + soft vignette + filmic grain
    col = mix(white, col, smoothstep(0.0, 0.35, uv.y) * 0.85 + 0.15);
    float vig = smoothstep(1.2, 0.35, dc);
    col *= mix(0.975, 1.0, vig);
    float g = hash(uv * 920.0 + uTime) - 0.5;
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
