import { Canvas } from '@react-three/fiber'
import LineNetwork from './LineNetwork'

export default function Scene3D() {
  return (
    <div className="scene3d-fixed">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <LineNetwork />
      </Canvas>
      <div className="scene3d-overlay"></div>
    </div>
  )
}
