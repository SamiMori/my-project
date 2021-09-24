// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import { Notifier } from '@airbrake/browser'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

Vue.config.productionTip = false

/* Bugsnag */
Bugsnag.start({
  apiKey: '76745d92f5b92e373965a036c0ff9075',
  releaseStage: process.env.NODE_ENV,
  plugins: [new BugsnagPluginVue(Vue)],
  enabledBreadcrumbTypes: ['log', 'navigation', 'request'],
  onError: function (event) {
    event.setUser('1', 'sami.moriwaki@solinftec.com.br')
  }
})

const bugsnagVue = Bugsnag.getPlugin('vue')
bugsnagVue.installVueErrorHandler(Vue)

/* Airbrake */
var airbrake = new Notifier({
  environment: 'production',
  projectId: 363293,
  projectKey: '09b7c4d87eca8e6315c79c0b0053509c'
})

Vue.config.errorHandler = function (err, vm, info) {
  airbrake.notify({
    error: err,
    params: {info: info}
  })
}

/* Sentry */
Sentry.init({
  Vue,
  dsn: 'https://f199a0a05ada48d6b707a9b19cd54314@o1019206.ingest.sentry.io/5985244',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
    })
  ],
  release: window.SENTRY_REALEASE,
  trackComponents: true,
  tracesSampleRate: 0.2,
  hooks: ['activate', 'create', 'destroy', 'mount', 'unmount', 'update'],
  logErrors: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
