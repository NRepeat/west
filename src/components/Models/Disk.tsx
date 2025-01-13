import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { applyProps, PrimitiveProps } from '@react-three/fiber'
import React, { useLayoutEffect, useRef } from 'react'

const Disk = (props: Omit<PrimitiveProps, 'object'>) => {
  const { scene, nodes, materials } = useGLTF('/disk.glb')
  console.log('nodes', nodes)
  console.log('materials', materials['Material.001'])
  const groupRef = useRef(null)
  useLayoutEffect(() => {
    Object.values(nodes).forEach(node => {
      if (node) {
        node.castShadow = true
        node.receiveShadow = true
      }
    })
    // applyProps(nodes['desirefxme_008001'].geometry)
    // applyProps(materials['Material.001'], { color: materials['Material.001'].color, roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
  }, [nodes, materials])
  // return <primitive {...props} object={scene} />
  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      rotation={new THREE.Euler(0, 2, 1.4)}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['desirefxme_008001'].geometry}
        material={materials['Material.001']}
      />
    </group>
  )
}

export default Disk
