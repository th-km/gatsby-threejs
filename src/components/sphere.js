import React, { useEffect, useRef } from "react"
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshPhongMaterial,
  PointLight,
  Mesh,
} from "three"
import "../styles/styles.css"

const Sphere = () => {
  const threeElement = useRef(null)

  useEffect(() => {
    let w = threeElement.current.clientWidth
    let h = threeElement.current.clientHeight

    const camera = new PerspectiveCamera(75, w / h, 1, 1000)
    camera.position.y = 150
    camera.position.z = 500

    const scene = new Scene()

    const lightA = new PointLight(0xffffff, 0.25)
    lightA.position.set(500, 500, 500)
    scene.add(lightA)

    const lightB = new PointLight(0xffffff, 0.25)
    lightB.position.set(-500, -500, -500)
    scene.add(lightB)

    const geometry = new SphereGeometry(200, 20, 10)
    const material = new MeshPhongMaterial({ flatShading: true })
    const shape = new Mesh(geometry, material)
    scene.add(shape)

    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(w, h)

    camera.lookAt(scene.position)
    renderer.setClearColor("#000")

    threeElement.current.appendChild(renderer.domElement)

    const animate = () => {
      renderer.render(scene, camera)
      shape.rotation.x += 0.01
      shape.rotation.y += 0.02

      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return <div className="App" ref={threeElement} />
}

export default Sphere
