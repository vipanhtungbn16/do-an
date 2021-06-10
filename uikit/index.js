import Vue from 'vue'

// Register components
const requireComponent = require.context('./components', true, /[\w]+\.vue$/)
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = componentConfig.default.name

    if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
    }
})
