import APP from '../../app'
import { rotateAroundWorldAxis } from '../utils/rotate-around-world'

const directionMap = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  top: 'ArrowUp',
  bottom: 'ArrowDown'
}

const addKeyboardConrols = () => {
  const pressed = new Set()

  window.addEventListener('keydown', (evt) => {
    pressed.add(evt.key)

    for (const code in directionMap) {
      if (pressed.has(directionMap[code])) {
        switch (code) {
          case 'top':
            rotateAroundWorldAxis(APP.world, 'x', -0.01)
            rotateAroundWorldAxis(APP.relief, 'x', -0.01)
            break
          case 'bottom':
            rotateAroundWorldAxis(APP.world, 'x', 0.01)
            rotateAroundWorldAxis(APP.relief, 'x', 0.01)
            break
          case 'left':
            rotateAroundWorldAxis(APP.world, 'z', 0.01)
            rotateAroundWorldAxis(APP.relief, 'z', 0.01)
            break
          case 'right':
            rotateAroundWorldAxis(APP.world, 'z', -0.01)
            rotateAroundWorldAxis(APP.relief, 'z', -0.01)
            break
        }
      }
    }
  })

  window.addEventListener('keyup', (evt) => {
    pressed.delete(evt.code)
    console.log(APP.world.rotation);
    // APP.world.rotation.normalize()
    // APP.relief.rotation.normalize()
  })
}

export {
  addKeyboardConrols
}
