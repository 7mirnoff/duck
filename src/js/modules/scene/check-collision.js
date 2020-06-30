import APP from '../../app'
import * as THREE from 'three'

const checkCollision = () => {
  const originPoint = APP.obj.position.clone()

  for (let vertexIndex = 0; vertexIndex < APP.obj.geometry.vertices.length; vertexIndex++) {
    const localVertex = APP.obj.geometry.vertices[vertexIndex].clone()
    const globalVertex = localVertex.applyMatrix4(APP.obj.matrix)
    const directionVector = globalVertex.sub(APP.obj.position)
    const ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
    const collisionResults = ray.intersectObjects(APP.collidableMeshList)
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      console.log('hit')
    } else {
      // console.log('hit2');
    }
  }
}

export { checkCollision }
