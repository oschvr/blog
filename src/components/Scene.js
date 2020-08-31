import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js'

import GLTFLoader from 'three-gltf-loader'
import gltfPath from '../../static/assets/models/Duck/glTF/Duck.gltf'
//  import texture from '../../public/assets/textures/royal_esplanade_1k.hdr'

class Scene extends React.Component {
  componentDidMount() {
    // Camera
    let camera = new THREE.PerspectiveCamera(
      45,
      this.mount.offsetWidth / this.mount.offsetHeight,
      0.1,
      2000
    )
    camera.position.set(100, 200, 200)

    //Scene
    var scene = new THREE.Scene()
    scene.background = new THREE.Color(0xa0a0a0)
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 500)

    // Lights
    let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemisphereLight.position.set(0, 200, 0)
    scene.add(hemisphereLight)

    let directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 200, 100)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.top = 180
    directionalLight.shadow.camera.bottom = -100
    directionalLight.shadow.camera.left = -120
    directionalLight.shadow.camera.right = 120
    scene.add(directionalLight)

    // Ground
    this.mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(200, 200),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true
    scene.add(this.mesh)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    this.mount.appendChild(this.renderer.domElement)

    //Controls
    this.controls = new OrbitControls(camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
    this.controls.enablePan = true
    this.controls.enableZoom = true
    this.controls.maxDistance = 9
    this.controls.minDistance = 2
    this.controls.enableDamping = true

    // Example glTF
    const loader = new GLTFLoader()
    loader.load(
      gltfPath,
      gltf => {
        // called when the resource is loaded
        let model = gltf.scene
        scene.add(model)
      },
      xhr => {
        // called while loading is progressing
        //console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`)
      },
      error => {
        // called when loading has errors
        //console.error('An error happened', error)
      }
    )

    //Example Cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    //scene.add(cube)

    this.animate = () => {
      requestAnimationFrame(this.animate.bind(this))
      cube.rotation.x += 0.01
      this.controls.update()
      this.renderer.render(scene, camera)
    }

    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }

  onWindowResize() {
    if (this.mount) {
      camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight
      camera.updateProjectionMatrix()
      this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    }
  }

  render() {
    return (
      <div
        ref={ref => (this.mount = ref)}
        style={{
          width: '100%',
          height: '300px',
          outlineStyle: 'none',
        }}
      />
    )
  }
}

export default Scene
