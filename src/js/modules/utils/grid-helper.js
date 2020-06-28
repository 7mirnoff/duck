import APP from '../../app'
import * as THREE from 'three'

const addGridHelper = () => {
  const size = 10
  const divisions = 10

  var gridHelper = new THREE.GridHelper(size, divisions)
  APP.scene.add(gridHelper)
}

export { addGridHelper }
