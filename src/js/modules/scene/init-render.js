import * as THREE from 'three'
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
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
  APP.composer = new EffectComposer(APP.renderer)

  const size = APP.renderer.getSize()

  APP.scene = new THREE.Scene()
  APP.camera = new THREE.PerspectiveCamera(50, size.x / size.y, 0.1, 1000) // в скобочках (угол обзора, порпорции экрана, параметры видимоcти обекта)
  APP.clock = new THREE.Clock()
  APP.controls = new OrbitControls(APP.camera, APP.renderer.domElement)

  APP.renderPass = new RenderPass(APP.scene, APP.camera)

  APP.composer.addPass(APP.renderPass)

  APP.effectPass = new EffectPass(APP.camera, new BloomEffect())
  APP.effectPass.renderToScreen = true
  APP.composer.addPass(APP.effectPass)

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
    APP.composer.render(APP.clock.getDelta())
  }

  animate()
}

export { rendering }
