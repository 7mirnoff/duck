import APP from '../../app'
import * as THREE from 'three'
import { rotateAroundWorldAxis } from '../utils/rotate-around-world'
import { checkCollision } from './check-collision'
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

  const moveDuck = () => {
    rotateAroundWorldAxis(APP.world, 'x', APP.worldDirectionDuck.x / MAX_SPREED_DUCK * APP.speedDuck)
    rotateAroundWorldAxis(APP.relief, 'x', APP.worldDirectionDuck.x / MAX_SPREED_DUCK * APP.speedDuck)
    rotateAroundWorldAxis(APP.world, 'z', APP.worldDirectionDuck.z / MAX_SPREED_DUCK * APP.speedDuck)
    rotateAroundWorldAxis(APP.relief, 'z', APP.worldDirectionDuck.z / MAX_SPREED_DUCK * APP.speedDuck)
  }

  const rotateDuck = () => {
    rotateAroundWorldAxis(APP.duck, 'y', APP.speedRotate)
    APP.duck.getWorldDirection(APP.worldDirectionDuck)
  }

  const makeAnimationMove = () => {
    moveDuck()
    rotateDuck()

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

      let isCollision = checkCollision()

      if (pressed.has(directionMap[code])) {
        switch (code) {
          case 'top':
            if (!isCollision) {
              APP.speedDuck = APP.speedDuck <= 1 ? APP.speedDuck += 0.02 : 1
            } else {
              APP.speedDuck = 0
            }
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
  APP.animationPool['move'] = makeAnimationMove

  window.addEventListener('keydown', (evt) => {
    pressed.add(evt.key)
  })

  window.addEventListener('keyup', (evt) => {
    pressed.delete(evt.code)

  })
}

export {
  addKeyboardConrols
}
