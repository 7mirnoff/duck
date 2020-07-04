uniform vec3 viewVector;
varying vec3 vNormal;
varying vec3 vNormel;

void main() {
  vNormal = normalize( normalMatrix * normal );
  vNormel = normalize( normalMatrix * viewVector );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
