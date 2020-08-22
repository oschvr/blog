import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js'
import GLTFLoader from 'three-gltf-loader'
import model from '../../public/assets/models/DamagedHelmet/glTF/DamagedHelmet.gltf'
//  import texture from '../../public/assets/textures/royal_esplanade_1k.hdr'

class Scene extends React.Component {
  componentDidMount() {
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.mount.offsetWidth / this.mount.offsetHeight,
      0.1,
      2000
    )
    this.camera.position.set(100, 200, 200)

    //Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xa0a0a0)
    this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000)

    // Lights
    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    this.hemisphereLight.position.set(0, 200, 0)
    this.scene.add(this.hemisphereLight)

    this.directionalLight = new THREE.DirectionalLight(0xffffff)
    this.directionalLight.position.set(0, 200, 100)
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.camera.top = 180
    this.directionalLight.shadow.camera.bottom = -100
    this.directionalLight.shadow.camera.left = -120
    this.directionalLight.shadow.camera.right = 120
    this.scene.add(this.directionalLight)

    // // Ground
    // this.mesh = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(2000, 2000),
    //   new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    // )
    // this.mesh.rotation.x = -Math.PI / 2
    // this.mesh.receiveShadow = true
    // this.scene.add(this.mesh)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    this.mount.appendChild(this.renderer.domElement)

    //Loader
    this.loader = new GLTFLoader()
    this.loader.load(
      model,
      gltf => {
        this.scene.add(gltf.scene)
        this.renderer.render(this.scene, this.camera)
      },
      xhr => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      // called when loading has errors
      error => {
        // console.log('An error happened: ', error)
      }
    )

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
    this.controls.enablePan = true
    this.controls.enableZoom = true
    this.controls.maxDistance = 9
    this.controls.minDistance = 2
    this.controls.enableDamping = true

    //Example Cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    //this.scene.add(cube)

    this.animate = () => {
      requestAnimationFrame(this.animate.bind(this))
      cube.rotation.x += 0.01
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    }

    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }

  onWindowResize() {
    if (this.mount) {
      this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    }
  }

  render() {
    return (
      <div
        ref={ref => (this.mount = ref)}
        style={{
          width: '100%',
          height: '500px',
          background: '#fff',
          outlineStyle: 'none',
        }}
      />
    )
  }
}

export default Scene
