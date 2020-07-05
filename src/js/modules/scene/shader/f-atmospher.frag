varying vec3 vNormal;
varying vec3 vNormel;
void main() {
  float intensity = pow( 0.4 - dot( vNormal, vec3( 0.0, 0.0, 0.5 ) ), 1.0 );
  gl_FragColor = vec4(0.1725, 0.5294, 1.0, 1.0) * intensity;
}
