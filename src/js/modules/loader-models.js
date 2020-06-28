import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

// const loader = new GLTFLoader()
const loader = new THREE.ObjectLoader()
const location = window.location.href
let models = {}

const sourses = [
  '/assets/models/duck.json',
  '/assets/models/relef.json'
]

const loadModels = (cb) => {
  sourses.forEach((sourse, index) => {
    let src = location + sourse

    if (location === 'http://localhost:3000/') {
      src = `..${sourse}`
    }

    loader.load(
      // resource URL
      src,
      // called when the resource is loaded
      function (gltf) {
        models[gltf.name] = gltf

        if (sourses.length === index + 1) {
          cb()
        }
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      // called when loading has errors
      function (error) {
        console.log(`Ошибка загрузки ${src}: ${error}`)
      }
    )
  })
}

export { loadModels, models }
