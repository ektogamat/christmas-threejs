import FireWorksMaterial from './FireWorksMaterial'
import { forwardRef } from 'react'

export default forwardRef(function FireWorks(props, ref) {
  return (
    <mesh ref={ref} frustumCulled={false} position={[0, 15, 0]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <FireWorksMaterial />
    </mesh>
  )
})
