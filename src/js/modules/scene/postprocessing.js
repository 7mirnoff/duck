import * as THREE from 'three'
import { BloomEffect, EffectPass, DepthOfFieldEffect } from 'postprocessing'
import APP from '../../app'

APP.postEffect = []

const initPostprocessing = () => {
  const bloom = new BloomEffect()
  const depth = new DepthOfFieldEffect(APP.camera, {
    focusDistance: 0.0,
    focalLength: 0.0015,
    bokehScale: 1.0
  })

  depth.target = APP.duck.position

  APP.postEffect.push(bloom)
  APP.postEffect.push(depth)

  APP.effectPass = new EffectPass(APP.camera, ...APP.postEffect)

  APP.effectPass.renderToScreen = true
  APP.composer.addPass(APP.effectPass)
}

export { initPostprocessing }
