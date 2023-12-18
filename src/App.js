import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { useState, Suspense } from 'react'
import PostProcessingEffects from './PostProcessingEffects'
import SnowGlobeModel from './SnowGlobeModel'
import Overlay from './Overlay'
import SceneSetup from './Scene'

export default function App() {
  const [inside, setInside] = useState(false)
  const isMobile = window.innerWidth < 768
  const canvasConfig = { antialias: false, depth: false, stencil: false, alpha: false }
  return (
    <>
      <Canvas gl={canvasConfig} camera={{ position: [0, 0, 5], fov: 35, far: 20000 }} dpr={1}>
        <Suspense fallback={null}>
          <SceneSetup isMobile={isMobile} />
          <SnowGlobeModel isMobile={isMobile} position={[0, -1.1, 0]} scale={0.09} inside={inside} />
          <PostProcessingEffects />
        </Suspense>
      </Canvas>
      <Overlay inside={inside} setInside={setInside} />
      <Loader />
    </>
  )
}
