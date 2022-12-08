import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import { library } from '@fortawesome/fontawesome-svg-core';
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: require('@/lib/locale/en.json'),
  ja: require('@/lib/locale/ja.json')
};

const locale = localStorage.getItem('lang') || 'ja';

const i18n = new VueI18n({
  locale,
  messages
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
