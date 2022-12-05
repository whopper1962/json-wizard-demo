import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faTrashArrowUp,
  faHandPointRight,
  faWandSparkles,
  faHatWizard
} from '@fortawesome/free-solid-svg-icons';
import {
  faClipboard
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const icons = [
  faWandSparkles,
  faHatWizard,
  faClipboard,
  faHandPointRight,
  faTrash,
  faTrashArrowUp
];

library.add(icons);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
