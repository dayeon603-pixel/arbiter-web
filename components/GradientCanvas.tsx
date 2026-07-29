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

/* Arbiter light-field: a restrained, institutional warm gradient — cream and soft
   amber warming into the brand bronze (#b5821e) toward the top/right/edges, with a
   whisper of cool slate for depth, over clean white behind the centred type.
   Cursor-reactive bronze bloom, faint sheen, vignette + grain. Editorial, not loud. */
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
    vec2 m  = uMouseSm * 0.28;
    vec2 p  = vec2(uv.x * uAspect, uv.y) * 1.45 + m;
    float t = uTime * 0.026;

    // slow silk flow
    vec2 w1 = vec2(fbm(p + vec2(t, t * 0.6)), fbm(p + vec2(5.2 - t * 0.4, 2.1 + t * 0.3)));
    float flow = fbm(p + w1 * 1.25 + vec2(-t * 0.28, t * 0.2));
    flow = flow * 0.74 + (uv.x + (1.0 - uv.y)) * 0.16; // warm toward top-right

    // warm Arbiter palette (bronze signature), low-saturation and editorial
    vec3 white  = vec3(1.0);
    vec3 cream  = vec3(0.982, 0.958, 0.910);
    vec3 amber  = vec3(0.949, 0.816, 0.556);
    vec3 bronze = vec3(0.760, 0.560, 0.185);   // #b5821e family
    vec3 slate  = vec3(0.874, 0.898, 0.928);   // faint cool for depth

    vec3 grad = cream;
    grad = mix(grad, amber,  smoothstep(0.30, 0.62, flow) * 0.92);
    grad = mix(grad, bronze, smoothstep(0.60, 0.90, flow) * 0.52);
    grad = mix(grad, slate,  smoothstep(0.30, 0.66, 1.0 - flow) * 0.34);

    // intensity: warm at top/right/edges, clean white behind the centred type
    float dc   = distance(uv, vec2(0.5, 0.5));
    float edge = smoothstep(0.15, 0.62, dc);
    float tr   = smoothstep(-0.1, 1.2, uv.x + uv.y);
    float band = smoothstep(0.38, 0.90, flow) * 0.5 + 0.5;
    float intensity = clamp(edge * mix(0.5, 1.0, tr) * band, 0.0, 1.0);

    vec3 col = mix(white, grad, intensity * 0.82);

    // cursor-following bronze bloom
    vec2 mp = uMouseSm * 0.5 + 0.5;
    col += (bronze * 0.26 + 0.05) * (1.0 - smoothstep(0.0, 0.5, distance(uv, mp))) * 0.34;

    // faint warm sheen streaks
    float streak = sin((uv.x * uAspect - uv.y) * 6.5 - uTime * 0.55 + flow * 4.0);
    col += vec3(0.05, 0.044, 0.030) * smoothstep(0.9, 1.0, streak) * intensity;

    // top fade + soft vignette + filmic grain
    col = mix(white, col, smoothstep(0.0, 0.35, uv.y) * 0.85 + 0.15);
    float vig = smoothstep(1.2, 0.35, dc);
    col *= mix(0.978, 1.0, vig);
    float g = hash(uv * 920.0 + uTime) - 0.5;
    col += g * 0.011;

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
