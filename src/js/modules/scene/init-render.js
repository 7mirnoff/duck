import * as THREE from 'three'
import APP from '../../app'

import { stats } from '../utils/add-stats'

import { createScene } from '../scene/create-scene'

const OrbitControls = require('three-orbit-controls')(THREE)

const rendering = () => {
  APP.renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#scene'),
    alpha: true,
    antialias: true
  })

  APP.renderer.setSize(window.innerWidth, window.innerHeight)
  APP.renderer.setPixelRatio(2)

  const size = APP.renderer.getSize()

  APP.scene = new THREE.Scene()
  APP.camera = new THREE.PerspectiveCamera(50, size.x / size.y, 0.1, 1000) // в скобочках (угол обзора, порпорции экрана, параметры видимоcти обекта)
  APP.controls = new OrbitControls(APP.camera, APP.renderer.domElement)
  // APP.camera.position.set(0.9, 0.5, 0)
  APP.controls.noKeys = true
  // APP.controls.dispose()

  createScene()

  const animate = () => {
    window.requestAnimationFrame(animate)
    stats.begin()

    for (const f in APP.animationPool) {
      APP.animationPool[f]()
    }

    render()
    stats.end()
  }

  const render = () => {
    APP.renderer.render(APP.scene, APP.camera)
  }

  animate()
}

export { rendering }
