import APP from '../../app'
import * as THREE from 'three'
import anime from 'animejs'

const checkVisible = () => {
  // console.log(APP.objectsToHide[0].position.y);
  APP.objectsToHide.forEach(object => {
    if (object.getWorldPosition(new THREE.Vector3()).y <= 0.6) {
      if (!object.animBegin) {
        anime({
          targets: object.scale,
          y: 0,
          x: 0,
          z: 0,
          easing: 'linear',
          duration: 800,
          begin: () => {
            object.animBegin = true
          },
          complete: () => {
            object.animBegin = false
          }
        })
      }
    }
    if (object.getWorldPosition(new THREE.Vector3()).y > 0.62) {
      if (!object.animBegin) {
        anime({
          targets: object.scale,
          y: object.defaultScale.y,
          x: object.defaultScale.x,
          z: object.defaultScale.z,
          easing: 'easeOutElastic',
          duration: 1300,
          begin: () => {
            object.animBegin = true
          },
          complete: () => {
            object.animBegin = false
          }
        })


      }
    }
  })
}

export {
  checkVisible
}
