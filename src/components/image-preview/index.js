import Vue from 'vue'
import VueImagePreview from './imagePreview.vue'

let instance

const defaultConfig = {
  images: [],
  value: true
}

const initInstance = () => {
  instance = new (Vue.extend(VueImagePreview))({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

const ImagePreview = (images, startPosition = 0) => {
  if (!instance) {
    initInstance()
  }

  const options = Array.isArray(images) ? { images, startPosition } : images

  Object.assign(instance, defaultConfig, options)

  instance.$once('input', show => {
    instance.value = show
  })
  return instance
}

ImagePreview.install = () => {
  Vue.use(VueImagePreview)
}

export default ImagePreview
