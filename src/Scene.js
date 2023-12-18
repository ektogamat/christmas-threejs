import { Environment, Lightformer, OrbitControls } from '@react-three/drei'

export default function SceneSetup({ isMobile }) {
  return (
    <>
      <color
        attach='background'
        args={['#014259']}
      />
      <ambientLight intensity={6.9} />
      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        zoomSpeed={1}
        maxDistance={isMobile ? 8 : 85.5}
        maxPolarAngle={Math.PI / 2}
        minDistance={0.2}
      />
      <Environment
        files='/background_hdr.exr'
        resolution={512}
      >
        <group rotation={[0, 0, 1]}>
          <Lightformer
            form='circle'
            intensity={2.5}
            position={[0, 10, -10]}
            scale={20}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
          <Lightformer
            intensity={0.9}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
            position={[10, 1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[50, 10, 1]}
          />
        </group>
      </Environment>
    </>
  )
}
