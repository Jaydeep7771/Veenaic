import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from './scrollStore'

const NODE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 90 : 220
const MAX_CONNECTIONS = NODE_COUNT * 6
const FIELD_W = 9
const FIELD_H = 5.5
const FIELD_Z = 2
const PUSH_RADIUS = 1.6

const stages = [
  { color: '#f0eee8', connectionDistance: 2.4, driftSpeed: 0.15 }, // hero
  { color: '#8a8a8a', connectionDistance: 1.8, driftSpeed: 0.10 }, // about
  { color: '#D9FF3C', connectionDistance: 2.0, driftSpeed: 0.18 }, // services
  { color: '#f0eee8', connectionDistance: 2.6, driftSpeed: 0.22 }, // work / products
  { color: '#8a8a8a', connectionDistance: 1.6, driftSpeed: 0.08 }, // process
  { color: '#D9FF3C', connectionDistance: 1.9, driftSpeed: 0.12 }, // testimonials
  { color: '#f0eee8', connectionDistance: 2.8, driftSpeed: 0.25 }, // cta
  { color: '#8a8a8a', connectionDistance: 1.5, driftSpeed: 0.06 }, // contact
]

export default function LineNetwork() {
  const pointsRef = useRef()
  const linesRef = useRef()
  const pointerWorld = useRef(new THREE.Vector2(9999, 9999))
  const colorRef = useRef(new THREE.Color(stages[0].color))
  const connDistRef = useRef(stages[0].connectionDistance)
  const driftRef = useRef(stages[0].driftSpeed)
  const frameCount = useRef(0)

  const { basePositions, phases, positions } = useMemo(() => {
    const base = new Float32Array(NODE_COUNT * 3)
    const ph = new Float32Array(NODE_COUNT * 2)
    for (let i = 0; i < NODE_COUNT; i++) {
      base[i * 3] = (Math.random() - 0.5) * FIELD_W
      base[i * 3 + 1] = (Math.random() - 0.5) * FIELD_H
      base[i * 3 + 2] = (Math.random() - 0.5) * FIELD_Z
      ph[i * 2] = Math.random() * Math.PI * 2
      ph[i * 2 + 1] = 0.4 + Math.random() * 0.6
    }
    return { basePositions: base, phases: ph, positions: base.slice() }
  }, [])

  const linePositions = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), [])

  useFrame((state) => {
    frameCount.current++
    const { index, t } = scrollState
    const curr = stages[index] || stages[0]
    const next = stages[Math.min(index + 1, stages.length - 1)]

    const targetColor = new THREE.Color(curr.color).lerp(new THREE.Color(next.color), t)
    colorRef.current.lerp(targetColor, 0.06)
    connDistRef.current = THREE.MathUtils.lerp(
      connDistRef.current,
      THREE.MathUtils.lerp(curr.connectionDistance, next.connectionDistance, t),
      0.08
    )
    driftRef.current = THREE.MathUtils.lerp(
      driftRef.current,
      THREE.MathUtils.lerp(curr.driftSpeed, next.driftSpeed, t),
      0.08
    )

    const dist = state.camera.position.z
    const vFov = (state.camera.fov * Math.PI) / 180
    const halfH = Math.tan(vFov / 2) * dist
    const halfW = (halfH * state.size.width) / state.size.height
    const targetPX = state.pointer.x * halfW
    const targetPY = state.pointer.y * halfH
    pointerWorld.current.x += (targetPX - pointerWorld.current.x) * 0.15
    pointerWorld.current.y += (targetPY - pointerWorld.current.y) * 0.15

    const elapsed = state.clock.elapsedTime
    const drift = driftRef.current
    for (let i = 0; i < NODE_COUNT; i++) {
      const bx = basePositions[i * 3]
      const by = basePositions[i * 3 + 1]
      const bz = basePositions[i * 3 + 2]
      const phase = phases[i * 2]
      const speed = phases[i * 2 + 1]
      let x = bx + Math.sin(elapsed * speed * drift + phase) * 0.4
      let y = by + Math.cos(elapsed * speed * drift * 0.8 + phase) * 0.3

      const dx = x - pointerWorld.current.x
      const dy = y - pointerWorld.current.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < PUSH_RADIUS && d > 0.001) {
        const force = (1 - d / PUSH_RADIUS) * 0.8
        x += (dx / d) * force
        y += (dy / d) * force
      }

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = bz
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.material.color.copy(colorRef.current)
    }

    if (frameCount.current % 2 === 0 && linesRef.current) {
      let vIdx = 0
      const cd = connDistRef.current
      const cd2 = cd * cd
      for (let i = 0; i < NODE_COUNT && vIdx < linePositions.length - 6; i++) {
        for (let j = i + 1; j < NODE_COUNT && vIdx < linePositions.length - 6; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 < cd2) {
            linePositions[vIdx++] = positions[i * 3]
            linePositions[vIdx++] = positions[i * 3 + 1]
            linePositions[vIdx++] = positions[i * 3 + 2]
            linePositions[vIdx++] = positions[j * 3]
            linePositions[vIdx++] = positions[j * 3 + 1]
            linePositions[vIdx++] = positions[j * 3 + 2]
          }
        }
      }
      const lineGeo = linesRef.current.geometry
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.setDrawRange(0, vIdx / 3)
      linesRef.current.material.color.copy(colorRef.current)
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={NODE_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={stages[0].color} size={0.045} sizeAttenuation transparent opacity={0.7} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={MAX_CONNECTIONS * 2} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={stages[0].color} transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}
