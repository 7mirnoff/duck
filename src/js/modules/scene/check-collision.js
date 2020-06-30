import APP from '../../app'
import * as THREE from 'three'

const checkCollision = () => {
  const originPoint = APP.physDuck.position.clone()

  for (let vertexIndex = 0; vertexIndex < APP.physDuck.geometry.vertices.length; vertexIndex++) {
    const localVertex = APP.physDuck.geometry.vertices[vertexIndex].clone()
    const globalVertex = localVertex.applyMatrix4(APP.physDuck.matrix)
    const directionVector = globalVertex.sub(APP.physDuck.position)
    const ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
    const collisionResults = ray.intersectObjects(APP.collidableMeshList)
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      console.log('hit')
      return true
    } else {

      // console.log('hit2');
    }
  }
}

export { checkCollision }
