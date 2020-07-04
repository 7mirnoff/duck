import APP from '../../app'
import * as THREE from 'three'
import { addGridHelper } from '../utils/grid-helper'
import { addLight } from './add-light'
import { addKeyboardConrols } from './add-controls'

import vShaderAtmo from './shader/v-atmospher.vert'
import fShaderAtmo from './shader/f-atmospher.frag'

import {
  models
} from '../loader-models'

import { lerp } from '../utils/lerp'

const settingWorld = {
  size: 1.6
}

const createScene = () => {
  addGridHelper()
  addLight()

  const WorldGeometry = new THREE.SphereGeometry(settingWorld.size, 70, 70)
  const WorldMaterial = new THREE.MeshStandardMaterial({
    color: 0x03C1FF,

    roughness: 1,
    metalness: 1
  })

  APP.world = new THREE.Mesh(WorldGeometry, WorldMaterial)
  APP.scene.add(APP.world)

  const worldAtmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      viewVector: {
        type: 'v3',
        value: APP.camera.position
      }
    },
    vertexShader: vShaderAtmo,
    fragmentShader: fShaderAtmo,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  })

  APP.worldAtmosphere = new THREE.Mesh(WorldGeometry, worldAtmosphereMaterial)
  APP.worldAtmosphere.scale.x = APP.worldAtmosphere.scale.y = APP.worldAtmosphere.scale.z = 1.2
  APP.scene.add(APP.worldAtmosphere)

  const updateScene = () => {
    APP.worldAtmosphere.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(APP.camera.position, APP.worldAtmosphere.position)
  }

  APP.animationPool['update-scene'] = updateScene

  APP.planetObjets = models['planet-objects']
  APP.scene.add(APP.planetObjets)

  APP.relief = models['relef']
  APP.collidableMeshList = []
  APP.collidableMeshList.push(APP.relief.children[0].children[2].children[1])
  APP.collidableMeshList.push(APP.relief.children[0].children[1].children[0])
  APP.scene.add(APP.relief)

  APP.duck = models['plasticDuck']
  APP.scene.add(APP.duck)
  APP.duck.position.set(0, settingWorld.size - 0.02, 0)
  APP.duck.children.forEach((mesh) => {
    mesh.rotation.z = -Math.PI / 2
    mesh.rotation.x = Math.PI / 2
  })

  const physDuckGeometry = new THREE.BoxGeometry(0.06, 0.06, 0.06)
  const physDuckMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,

    roughness: 1,
    metalness: 1
  })
  APP.physDuck = new THREE.Mesh(physDuckGeometry, physDuckMaterial)
  APP.scene.add(APP.physDuck)
  APP.physDuck.position.set(0, settingWorld.size, 0)

  const cameraPosition = APP.duck.position.clone().addScalar(1)
  APP.camera.position.set(0, cameraPosition.y, -cameraPosition.z)
  APP.camera.lookAt(APP.duck.position)

  addKeyboardConrols()
}

export {
  createScene
}
