import { EffectComposer, Bloom, HueSaturation, Vignette, SMAA, TiltShift2 } from '@react-three/postprocessing'

export default function PostProcessingEffects() {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <SMAA />
      <TiltShift2 />
      <Bloom mipmapBlur luminanceThreshold={0.9} intensity={1} luminanceSmoothing={0.08} />
      <HueSaturation hue={0.2} saturation={0.25} />
      <Vignette darkness={0.6} offset={0.4} />
    </EffectComposer>
  )
}
