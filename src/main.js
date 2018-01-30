// Import Vue
import Vue from 'vue'

// Import F7 (with all components)
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import Routes
import routes from './routes.js'

// Import App Component
import app from './app.vue'

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

let theme = 'md';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  render: c => c('app'),
  components: { app },
  framework7: {
    id: 'io.framework7.testapp',
    theme, // md or ios
  },
  routes,
});
