import APP from '../../app'
import * as THREE from 'three'

const checkCollision = () => {
  var originPoint = APP.obj.position.clone()

  for (var vertexIndex = 0; vertexIndex < APP.obj.geometry.vertices.length; vertexIndex++) {
    var localVertex = APP.obj.geometry.vertices[vertexIndex].clone()
    var globalVertex = localVertex.applyMatrix4(APP.obj.matrix)
    var directionVector = globalVertex.sub(APP.obj.position)
    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
    var collisionResults = ray.intersectObjects(APP.collidableMeshList)
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      console.log('hit')
    } else {
      // console.log('hit2');
    }
  }
}

export { checkCollision }
