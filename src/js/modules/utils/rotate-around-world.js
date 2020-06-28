import * as THREE from 'three'
const rotateAroundWorldAxis = (object, axis, radians) => {
  const rotWorldMatrix = new THREE.Matrix4()

  let axisVector = null

  if (axis === 'x') {
    axisVector = new THREE.Vector3(1, 0, 0)
  }

  if (axis === 'y') {
    axisVector = new THREE.Vector3(0, 1, 0)
  }

  if (axis === 'z') {
    axisVector = new THREE.Vector3(0, 0, 1)
  }

  rotWorldMatrix.makeRotationAxis(axisVector.normalize(), radians)

  const currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1)
  const newPos = currentPos.applyMatrix4(rotWorldMatrix)

  rotWorldMatrix.multiply(object.matrix)
  object.matrix = rotWorldMatrix
  object.rotation.setFromRotationMatrix(object.matrix)

  object.position.x = newPos.x
  object.position.y = newPos.y
  object.position.z = newPos.z
}

export { rotateAroundWorldAxis }
