import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.css';

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');

