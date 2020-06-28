import './modules/polyfill'
import APP from './app'
import * as THREE from 'three'
import { loadModels, models } from './modules/loader-models'
import { rendering } from './modules/scene/init-render'

// import vertexShader from './modules/shader.vert'
// import fragmentShader from './modules/shader.frag'

loadModels(rendering)
