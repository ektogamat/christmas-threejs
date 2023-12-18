import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, Suspense } from 'react'
import { easing } from 'maath'

export default function SnowFlakes({ count }) {
  const mesh = useRef()
  const dummy = new THREE.Object3D()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + Math.random() * 2)
      const theta = Math.random() * 2 * Math.PI

      const radius = 5 + Math.random() * 6.5
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      const speed = 0.001 + Math.random() / 10

      const scale = Math.cos(0.5 + Math.random() * 2.5)

      temp.push({ phi, theta, radius, speed, x, y, z, mx: 0, my: 0, scale })
    }
    return temp
  }, [count])

  useFrame((state, delta) => {
    easing.damp3(mesh.current.rotation, [0, -state.mouse.y * state.viewport.width * 2, 0], 0.75, delta)

    particles.forEach((particle, i) => {
      let { phi, theta, radius, speed, scale } = particle
      theta += speed / 20

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = 15 + radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      particle.phi = phi
      particle.theta = theta

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(scale)
      dummy.rotation.set(phi, theta, 0)
      dummy.updateMatrix()

      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial color="#b3b3b3" emissive="grey" emissiveIntensity={2} />
    </instancedMesh>
  )
}
