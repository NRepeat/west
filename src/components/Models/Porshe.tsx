import { useGLTF } from "@react-three/drei";
import { applyProps, PrimitiveProps, useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

function Porsche(props: Omit<PrimitiveProps, 'object'>) {
	const { scene, nodes, materials } = useGLTF('/building.glb')
	console.log('materials', materials)
	useLayoutEffect(() => {
		// Object.values(nodes).forEach((node) => {
		// 	if (node) {
		// 		node.castShadow = true
		// 		node.receiveShadow = true
		// 	}
		// })
		// applyProps(materials['Material.002'], { color: '#222', roughness: 0.6, roughnessMap: null, normalScale: [4, 4] })
		// applyProps(materials['Material.003'], { color: 'black', roughness: 0, clearcoat: 0.1 })
		// applyProps(materials['Material.004'], { envMapIntensity: 4, roughness: 0.5, metalness: 1 })
		// applyProps(materials['Material.002'], { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#000f07' })
	}, [nodes, materials])
	return <primitive {...props} object={scene} />
}
export default Porsche