import APP from '../../app'
import * as THREE from 'three'
import { addGridHelper } from '../utils/grid-helper'
import { addLight } from './add-light'
import { addKeyboardConrols } from './add-controls'

import {
  models
} from '../loader-models'

import { lerp } from '../utils/lerp'
import { Object3D } from 'three'

const settingWorld = {
  size: 1.6
}

const createScene = () => {
  addGridHelper()
  addLight()
  // for (const model in models) {
  //   APP.scene.add(models[model])
  // }


  const WorldGeometry = new THREE.SphereGeometry(settingWorld.size, 70, 70)
  const WorldMaterial = new THREE.MeshStandardMaterial({
    color: 0x03C1FF,

    roughness: 1,
    metalness: 1

    // roughnessMap: roughnessMap,
    // metalnessMap: metalnessMap,

    // envMap: envMap,
    // envMapIntensity: envMapIntensity
  })
  APP.world = new THREE.Mesh(WorldGeometry, WorldMaterial)
  APP.scene.add(APP.world)

  APP.relief = models['relef']
  APP.scene.add(APP.relief)

  APP.duck = models['plasticDuck']
  APP.scene.add(APP.duck)
  APP.duck.position.set(0, settingWorld.size, 0)


  const cameraPosition = APP.duck.position.clone().addScalar(1)
  APP.camera.position.set(0, cameraPosition.y, -cameraPosition.z)
  APP.camera.lookAt(APP.duck.position)


  addKeyboardConrols()
}

export {
  createScene
}
