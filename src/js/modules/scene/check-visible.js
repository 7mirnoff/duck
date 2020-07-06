import APP from '../../app'
import * as THREE from 'three'

const checkVisible = () => {
  // console.log(APP.objectsToHide[0].position.y);
  APP.objectsToHide.forEach(object => {
    if (object.getWorldPosition(new THREE.Vector3()).y <= 0.3) {
      object.visible = false
    } else {
      object.visible = true
    }
  })
}

export { checkVisible }
