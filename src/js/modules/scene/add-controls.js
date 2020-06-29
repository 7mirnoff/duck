import APP from '../../app'
import * as THREE from 'three'
import { rotateAroundWorldAxis } from '../utils/rotate-around-world'
import { Vector3 } from 'three'

const directionMap = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  top: 'ArrowUp',
  bottom: 'ArrowDown'
}

const SPEED_RORATION_DUCK = 0.04
const MAX_SPREED_DUCK = 180
APP.speedDuck = 1

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

  }

  const makeAnimationStep = () => {
    moveDuck()
  }
  APP.animationPool['move'] = makeAnimationStep

  window.addEventListener('keydown', (evt) => {
    pressed.add(evt.key)

    for (const code in directionMap) {
      if (pressed.has(directionMap[code])) {
        switch (code) {
          case 'top':

            break
          case 'bottom':

            break
          case 'left':
            rotateAroundWorldAxis(APP.duck, 'y', SPEED_RORATION_DUCK)
            APP.duck.getWorldDirection(APP.worldDirectionDuck)
            break
          case 'right':
            rotateAroundWorldAxis(APP.duck, 'y', -SPEED_RORATION_DUCK)
            APP.duck.getWorldDirection(APP.worldDirectionDuck)
            break
        }
      }
    }
  })

  window.addEventListener('keyup', (evt) => {
    pressed.delete(evt.code)

  })
}

export {
  addKeyboardConrols
}
