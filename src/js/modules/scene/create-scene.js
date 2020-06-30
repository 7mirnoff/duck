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
  APP.collidableMeshList = []
  console.log(APP.relief.children[0]);
  APP.collidableMeshList.push(APP.relief.children[0].children[2].children[1])
  APP.collidableMeshList.push(APP.relief.children[0].children[1].children[0])
  APP.scene.add(APP.relief)

  APP.duck = models['plasticDuck']
  APP.scene.add(APP.duck)
  APP.duck.position.set(0, settingWorld.size, 0)
  APP.duck.children.forEach((mesh) => {
    mesh.rotation.y = Math.PI / 2
  })



  const ObjGeometry = new THREE.SphereGeometry(0.1, 2, 2)
  const ObjMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,

    roughness: 1,
    metalness: 1

    // roughnessMap: roughnessMap,
    // metalnessMap: metalnessMap,

    // envMap: envMap,
    // envMapIntensity: envMapIntensity
  })
  APP.obj = new THREE.Mesh(ObjGeometry, ObjMaterial)
  APP.scene.add(APP.obj)
  APP.obj.position.set(0, settingWorld.size, 0)




  const cameraPosition = APP.duck.position.clone().addScalar(1)
  APP.camera.position.set(0, cameraPosition.y, -cameraPosition.z)
  APP.camera.lookAt(APP.duck.position)


  addKeyboardConrols()
}

export {
  createScene
}
