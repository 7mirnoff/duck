import APP from '../../app'
import * as THREE from 'three'

const addLight = () => {
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
  APP.scene.add(directionalLight)
}

export { addLight }
