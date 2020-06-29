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
const MAX_SPREED_DUCK = 60

const addKeyboardConrols = () => {
  const pressed = new Set()

  rotateAroundWorldAxis(APP.duck, 'y', -Math.PI / 2)

  APP.worldDirectionDuck = APP.duck.getWorldDirection()

  window.addEventListener('keydown', (evt) => {
    pressed.add(evt.key)

    for (const code in directionMap) {
      if (pressed.has(directionMap[code])) {
        switch (code) {
          case 'top':
            rotateAroundWorldAxis(APP.world, 'x', APP.worldDirectionDuck.x / MAX_SPREED_DUCK)
            rotateAroundWorldAxis(APP.relief, 'x', APP.worldDirectionDuck.x / MAX_SPREED_DUCK)
            rotateAroundWorldAxis(APP.world, 'z', APP.worldDirectionDuck.z / MAX_SPREED_DUCK)
            rotateAroundWorldAxis(APP.relief, 'z', APP.worldDirectionDuck.z / MAX_SPREED_DUCK)
            break
          case 'bottom':
            // rotateAroundWorldAxis(APP.world, 'x', 0.01)
            // rotateAroundWorldAxis(APP.relief, 'x', 0.01)
            break
          case 'left':
            rotateAroundWorldAxis(APP.duck, 'y', SPEED_RORATION_DUCK)
            APP.duck.getWorldDirection(APP.worldDirectionDuck)
            // rotateAroundWorldAxis(APP.world, 'z', 0.01)
            // rotateAroundWorldAxis(APP.relief, 'z', 0.01)
            break
          case 'right':
            rotateAroundWorldAxis(APP.duck, 'y', -SPEED_RORATION_DUCK)
            APP.duck.getWorldDirection(APP.worldDirectionDuck)
            // rotateAroundWorldAxis(APP.world, 'z', -0.01)
            // rotateAroundWorldAxis(APP.relief, 'z', -0.01)
            break
        }
      }
    }
  })

  window.addEventListener('keyup', (evt) => {
    pressed.delete(evt.code)
    // APP.world.rotation.normalize()
    // APP.relief.rotation.normalize()
  })
}

export {
  addKeyboardConrols
}
