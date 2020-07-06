import APP from '../../app'
import * as THREE from 'three'

const checkVisible = () => {
  APP.objectsToHide.forEach(object => {

    if (object.position.y <= 1.2) {
      object.visible = false
    } else {
      object.visible = true
    }
    // console.log(object);
  })
}

export { checkVisible }
