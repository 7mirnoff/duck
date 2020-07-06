import APP from '../../app'
import * as THREE from 'three'
import { rotateAroundWorldAxis } from '../utils/rotate-around-world'
import { checkCollision } from './check-collision'
import { checkVisible } from './check-visible'

import anime from 'animejs'

const directionMap = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  top: 'ArrowUp',
  bottom: 'ArrowDown'
}

const MAX_SPREED_DUCK = 180
APP.speedDuck = 0
APP.speedRotate = 0

const addKeyboardConrols = () => {
  const pressed = new Set()

  rotateAroundWorldAxis(APP.duck, 'y', -Math.PI / 2)

  APP.worldDirectionDuck = APP.duck.getWorldDirection()

  APP.resetMatrixWorld = APP.relief.matrix
  const resetPosition = (object) => {
    APP.speedDuck = 0
    APP.speedRotate = 0
    const currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1)
    const newPos = currentPos.applyMatrix4(APP.resetMatrixWorld)

    object.matrix = APP.resetMatrixWorld
    object.rotation.setFromRotationMatrix(object.matrix)

    object.position.x = newPos.x
    object.position.y = newPos.y
    object.position.z = newPos.z
  }

  const moveDuck = () => {
    rotateAroundWorldAxis(APP.objectsToRotate, 'x', APP.worldDirectionDuck.x / MAX_SPREED_DUCK * APP.speedDuck)
    rotateAroundWorldAxis(APP.objectsToRotate, 'z', APP.worldDirectionDuck.z / MAX_SPREED_DUCK * APP.speedDuck)
  }

  const rotateDuck = () => {
    rotateAroundWorldAxis(APP.duck, 'y', APP.speedRotate)
    APP.duck.getWorldDirection(APP.worldDirectionDuck)
  }

  APP.isStopControl = false

  const makeAnimationMove = () => {
    moveDuck()
    rotateDuck()

    checkVisible()

    if (checkCollision() && !APP.isStopControl) {
      APP.isStopControl = true
      anime({
        targets: APP,
        speedDuck: [0, -APP.speedDuck * 1.2, 0],
        easing: 'easeInOutCubic',
        complete: () => {
          APP.isStopControl = false
        }
      })
    }

    if (!APP.isStopControl) {
      for (const code in directionMap) {
        if (!pressed.has('ArrowUp') && !pressed.has('ArrowDown')) {
          if (APP.speedDuck > 0) {
            APP.speedDuck -= 0.0025
          }

          if (APP.speedDuck < 0) {
            APP.speedDuck += 0.0025
          }
        }

        if (!pressed.has('ArrowLeft') && !pressed.has('ArrowRight')) {
          if (APP.speedRotate > 0) {
            APP.speedRotate -= 0.0001
          }

          if (APP.speedRotate < 0) {
            APP.speedRotate += 0.0001
          }
        }

        if (pressed.has(directionMap[code])) {
          switch (code) {
            case 'top':
              APP.speedDuck = APP.speedDuck <= 1 ? APP.speedDuck += 0.02 : 1
              break
            case 'bottom':
              APP.speedDuck = APP.speedDuck >= -0.4 ? APP.speedDuck -= 0.02 : -0.4
              break
            case 'left':
              APP.speedRotate = APP.speedRotate <= 0.02 ? APP.speedRotate += 0.0015 : 0.02
              break
            case 'right':
              APP.speedRotate = APP.speedRotate >= -0.02 ? APP.speedRotate -= 0.0015 : -0.02
              break
            default:
              break
          }
        }
      }
    }
  }
  APP.animationPool['move'] = makeAnimationMove

  window.addEventListener('keydown', (evt) => {
    pressed.add(evt.key)
    if (evt.keyCode === 82) {
      resetPosition(APP.objectsToRotate)
    }
  })

  window.addEventListener('keyup', (evt) => {
    pressed.delete(evt.code)

  })
}

export {
  addKeyboardConrols
}
